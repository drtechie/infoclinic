///////////////////////////////////////////////////////
// Fetches data from API and renders template
// based on properties passed from router.
// Also handles loading meta data per template.
///////////////////////////////////////////////////////

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import queryString from 'qs';

import AsyncChunks from '../../utilities/AsyncLoader';
import canUseDom from '../../../utilities/canUseDom';
import api from '../../../api';
import InfoClinicHelmet from "./helmet";

const AsyncDefault = AsyncChunks.generateChunk(() => 
	import( /* webpackChunkName: "Default" */ '../Default'));

const AsyncHome = AsyncChunks.generateChunk(() => 
	import( /* webpackChunkName: "Home" */ '../Home'));

const AsyncPost = AsyncChunks.generateChunk(() => 
	import( /* webpackChunkName: "Post" */ '../Post'));

const AsyncPosts = AsyncChunks.generateChunk(() =>
    import( /* webpackChunkName: "Posts" */ '../Posts'));

const AsyncAuthor = AsyncChunks.generateChunk(() =>
    import( /* webpackChunkName: "Author" */ '../Author'));

const templates = {
	home: AsyncHome,
	default: AsyncDefault,
	post: AsyncPost,
	posts: AsyncPosts,
    author: AsyncAuthor,
}

const mapStateToProps = state => ({
	data: state.api.data
});

const mapDispatchToProps = dispatch => ({
	load: (data) => dispatch({ type: 'LOAD_DATA_BY_SLUG', payload: data })
});

class LoadTemplate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			preview: false,

			// Slug will either come from a prop or a URL param from Router
			// Necessary because some slugs come from URL params
			slug: this.props.slug 
				? this.props.slug 
				: this.props.match.params.slug
		}

        this.fetchData(this.state.slug);
	}

	checkForPreview() {
		if (canUseDom) {
			let params = [];

			params = queryString.parse(
				window.location.search,
				{ ignoreQueryPrefix: true }
			);

			if (params.preview === 'true' && params['_wpnonce']) {
				api.Content.previewDataBySlug( this.props.type, this.state.slug, params['_wpnonce']).then(
					res => {
						this.setState({ preview: res })
					},
					error => {
						console.warn(error);
						this.props.history.push('/not-found');
					}
				);
			} 
		}
	}

	fetchData(slug) {
		if (!this.props.data[this.props.type][slug]) {
			const promises = []
            if (this.props.type === 'authors') {
                promises.push(api.Content.getUser(slug).then(
                    res => {
                        return res[0];
                    },
                    error => {
                        console.warn(error);
                    }
                ));
            } else {
                promises.push(api.Content.dataBySlug(this.props.type, slug).then(
                    res => {
                        return res[0];
                    },
                    error => {
                        console.warn(error);
                    }
                ));
            }
			if (this.props.type === 'pages' && slug === 'home') {
                promises.push(api.Content.stickyPosts(3).then(
                    res => {
                        return { stickies: res }
                    },
                    error => {
                        console.warn(error);
                    }
                ));
			}
            Promise.all(promises)
                .then(data => {
                	const res = [data.reduce((r, o) => Object.assign(r, o), {})];
                    this.props.load({
                        type: this.props.type,
                        slug: slug,
                        data: res
                    })
                })
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.slug !== this.props.match.params.slug) {
			this.setState({
				slug: this.props.match.params.slug
			});
            this.fetchData(this.props.match.params.slug);
		}
	}

	render() {

		this.checkForPreview();

		let data = this.state.preview;
		
		if (!this.state.preview && this.props.data[this.props.type] && this.props.data[this.props.type][this.state.slug]) {
			data = this.props.data[this.props.type][this.state.slug];
		}

		const Template = templates[this.props.template];

		if (!Template) {
			return <Redirect to="/not-found"/>;
		}

		const pageTitles = {
			"/posts" : "All Posts"
		};

        let title = null;
		let description = null;
		let imageURL = null;
		let relativeURL = null;
        let type = null;
		let articlePublishDate = null;
		let articleModifiedDate = null;
		if (data) {
            if (this.props.location.pathname !== '/') {
                relativeURL = this.props.location.pathname;
			}
			console.log(relativeURL)
            if (this.props.location.pathname.includes('authors/')) {
                title = data.name;
                imageURL = data.avatar_url;
			} else if (this.props.location.pathname.includes('posts/')) {
                title = data.title.rendered;
                description = data.excerpt.rendered;
                type = 'article';
                articlePublishDate = data.date;
                articleModifiedDate = data.modified;
                imageURL = data.featured_image_url;
			} else {
            	title = pageTitles[this.props.location.pathname];
			}
		}

		const metaProps = {
            title,
			description,
			imageURL,
            type,
			relativeURL,
			articlePublishDate,
			articleModifiedDate,
		}

		return [
            <InfoClinicHelmet {...metaProps} key='helmet'/>,
            <Template data={data} slug={this.state.slug} key='template'/>
		];
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadTemplate));

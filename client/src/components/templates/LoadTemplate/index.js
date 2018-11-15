///////////////////////////////////////////////////////
// Fetches data from API and renders template
// based on properties passed from router.
// Also handles loading meta data per template.
///////////////////////////////////////////////////////

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import queryString from 'qs';

import AsyncChunks from '../../utilities/AsyncLoader';
import canUseDom from '../../../utilities/canUseDom';
import api from '../../../api';

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

		let Meta = () => null;

		const Template = templates[this.props.template];

		if (!Template) {
			return <Redirect to="/not-found"/>;
		}

		if (data) {
			Meta = () => {
				return (
					<Helmet>
						<title>{data.acf.metaTitle}</title>
						<meta name="description" content={data.acf.metaDescription} />
						<meta name="keywords" content={data.acf.metaKeywords} />
					</Helmet>
				)
			}
		}

		return [
            <Meta key='meta'/>,
            <Template data={data} slug={this.state.slug} key='template'/>
		];
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadTemplate);

import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import AsyncChunks from './components/utilities/AsyncLoader';
import NotFound from './components/templates/NotFound';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadTemplate from './components/templates/LoadTemplate';
import api from './api';
import './index.css';

const mapStateToProps = (state) => ({
	pageList: state.api.lists.pages
});

const mapDispatchToProps = (dispatch) => ({
	loadPages: (list) => dispatch({ type: 'LOAD_PAGES_LIST', payload: list })
});

class App extends Component {

	constructor(props) {
		super(props);

		this.buildRoutes = (pages) => {

			if (this.props.pageList && this.props.pageList.length > 0) {
				return [
					<Route
						key="posts"
						render={(props)=> {
							return <LoadTemplate
                                {...props}
                                template="post"
                                type="posts" />
						}

						}
						exact
						path="/posts/:slug"/>,

					pages.map((route, i) => {

						// If home, set path to empty string, = '/'
						if (route.slug === 'home') {
							route.path = '';
						}

						// If template is blank, set to default
						if (route.template === '') {
							route.template = 'default'
						}

						// Default WP REST API expects /pages/ and /posts/ formatting
						// Custom post types are all singular (sigh)
						route.type = route.type === 'page'
							? 'pages'
							: route.type === 'post'
							? 'posts'
							: route.type;

						return (
							<Route
								render={ (props)=>
									<LoadTemplate
									{...props}
									template={route.template}
									slug={route.slug}
									type={route.type} />
								}
								exact
								key={i}
								path={`/${decodeURIComponent(route.path)}`}/>
						)
					}),

					<Route key="not-found" component={NotFound} />
				]
			}
		}

		this.fetchAndLoadPages();
	}

	fetchAndLoadPages() {
        if (this.props.pageList && this.props.pageList.length > 0) {
            this.props.loadPages(this.props.pageList);
        } else {
            this.props.loadPages(api.Content.pageList());
        }
	}

	componentDidMount() {
		// Over-eager load code split chunks
		// Two seconds after App mounts (wait for more important resources)
		setTimeout(AsyncChunks.loadChunks, 2 * 1000);
	}

	render() {
		return [
			<Header key='header'/>,
			<Switch key='main'>
				{ this.buildRoutes(this.props.pageList) }
			</Switch>,
			<Footer key='footer'/>,
		];
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

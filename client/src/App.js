import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import ReactGA from 'react-ga';
import AsyncChunks from './components/utilities/AsyncLoader';
import NotFound from './components/templates/NotFound';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import LoadTemplate from './components/templates/LoadTemplate';
import api from './api';
import './index.css';
import NotificationPopup from "./components/layout/Modals/notification";
import firebase from './firebaseConfig';
import Analytics from "./components/layout/Analytics";

const mapStateToProps = (state) => ({
	pageList: state.api.lists.pages,
	categoriesList: state.api.lists.categories,
});

const mapDispatchToProps = (dispatch) => ({
	loadPages: (list) => dispatch({ type: 'LOAD_PAGES_LIST', payload: list }),
	loadCategories: (list) => dispatch({ type: 'LOAD_CATEGORIES_LIST', payload: list })
});

class App extends Component {
	constructor(props) {
		super(props);
		ReactGA.initialize(process.env.REACT_APP_GA);
		this.buildRoutes = (pages) => {

			if (this.props.pageList && this.props.pageList.length > 0) {
				return [
					<Route
						key="posts"
						render={(props) => {
							return <LoadTemplate
								{...props}
								template="post"
								type="posts" />
						}}
						exact
						path="/posts/:slug"
					/>,
					<Route
						key="author"
						render={(props) => {
							return <LoadTemplate
								{...props}
								template="author"
								type="authors" />
						}

						}
						exact
						path="/authors/:slug"
					/>,
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
								render={(props) =>
									<LoadTemplate
										{...props}
										template={route.template}
										slug={route.slug}
										type={route.type} />
								}
								exact
								key={i}
								path={`/${decodeURIComponent(route.path)}`} />
						)
					}),
					<Route
						exact
						key="wp-draft"
						path="post/wp-draft"
						render={props =>
							<LoadTemplate
								{...props}
								slug={'wp-draft'}
								type={'pages'} />
						}
					/>,

					<Route key="not-found" component={NotFound} />
				]
			}
		}
		this.fetchAndLoadPages();
		this.fetchAndLoadCategories();
	}

	fetchAndLoadPages() {
		if (this.props.pageList && this.props.pageList.length > 0) {
			this.props.loadPages(this.props.pageList);
		} else {
			this.props.loadPages(api.Content.pageList());
		}
	}

	fetchAndLoadCategories() {
		if (this.props.categoriesList && this.props.categoriesList.length > 0) {
			this.props.loadCategories(this.props.categoriesList);
		} else {
			this.props.loadCategories(api.Content.categoryList());
		}
	}

	componentDidMount() {
		// Over-eager load code split chunks
		// Two seconds after App mounts (wait for more important resources)
		setTimeout(() => {
			AsyncChunks.loadChunks();
			const messaging = firebase.app().messaging();

			messaging.onMessage(payload => {
				console.log("Notification Received", payload);
				this.props.toastManager.add(payload.notification.title, {
					appearance: 'success',
					autoDismiss: true,
				});
			});
		}, 2 * 1000);
	}

	render() {
		return [
			<ScrollToTop key="scroll" />,
			<Header key="header" />,
			<main id="main" key="main">
				<Switch>
					{this.buildRoutes(this.props.pageList)}
				</Switch>
			</main>,
			<Footer key="footer" />,
			<NotificationPopup key="notification-popup" />,
			<Analytics key='analytics' />
		];
	}
}

export default withToastManager(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));

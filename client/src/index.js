import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import configureStore from './store';
import App from './App';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'production') {

	const store = configureStore( window.PAGE_STATE || {} );

	window.onload = () => {
		Loadable.preloadReady().then(() => {
			ReactDOM.hydrate(
				<Provider store={store}>
					<ToastProvider>
                        <Router>
                            <App />
                        </Router>
					</ToastProvider>
				</Provider>
			, document.getElementById('root'));
		})
	}
} else {

	const store = configureStore();

	ReactDOM.render(
		<Provider store={store}>
            <ToastProvider>
                <Router>
                    <App />
                </Router>
            </ToastProvider>
		</Provider>
	, document.getElementById('root'));
}

serviceWorker.register();
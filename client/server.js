import express from 'express';
import Loadable from 'react-loadable';
import serverRenderer from './middleware/renderer';
import clearReduxStore from './middleware/clear-redux-store';
import configureStore from './src/store';
import {subscribeTokenToTopic} from "./src/server/dal/fcm";

require('dotenv').load();

const store = configureStore();

const app = express();
app.use(express.json());
const path = require('path');
const instance = +process.env.NODE_APP_INSTANCE || 0;
const port = 1337 + instance;

app.get('/clear-redux-store/:type/:slug', clearReduxStore.bySlug(store));

app.get('/clear-redux-store', clearReduxStore.all(store));

app.post('/subscribe', function(req, res){
    subscribeTokenToTopic(req.body.token, 'infoclinic-updates', req.body.sendNotification)
		.then((response) => {
            res.json({subscribed: response});
		})
		.catch((error) => {
            res.json({error: error});
		})
});

app.use('^/$', serverRenderer(store));

app.use(express.static(path.join(__dirname, 'build')));

app.use('*', serverRenderer(store));

Loadable.preloadAll().then(() => {
	app.listen(port, (error) => {
		console.log("listening on " + port + "...");
	});
});

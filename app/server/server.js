
import express from 'express';

//import path from 'path';
import morgan from 'morgan';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { useRouterHistory, RouterContext, match } from 'react-router';

import { browserHistory, useQueries } from 'history';
//import compression from 'compression';
import Promise from 'bluebird';

//import configureStore from 'store/configureStore';
import createRoutes from '../shared/router';

import { Provider } from 'react-redux';

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(express.static(__dirname + '/../../dist'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//The 404 Route (ALWAYS Keep this as the last route)
/*app.get('/article', function(req, res){
	res.send('article', 200);
});*/



app.get('*', (req, res, next)=> {
	//let history = useRouterHistory(useQueries(createMemoryHistory))();
	//let location = history.createLocation(req.url);

	let history = browserHistory;
	//let location = req.url;

	//let store = configureStore();
	let routes = createRoutes(history);

	match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {

		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(301, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps ) {
			//let store = {};
			/*let body = ReactDOMServer.renderToString(
				<Provider store={store}>
					{ <RouterContext {...renderProps}/> }
				</Provider>
			);*/

			let body = ReactDOMServer.renderToString(
				<RouterContext {...renderProps}/>
			);

			//res.render('../views/index', { body });
			res.send(res.render('index', { body }));
			//res.send(res.render('index', { body }));




			/*let [ getCurrentUrl, unsubscribe ] = subscribeUrl();
			 let reqUrl = location.pathname + location.search;

			 getReduxPromise().then(()=> {
			 let reduxState = escape(JSON.stringify(store.getState()));
			 let html = ReactDOMServer.renderToString(
			 <Provider store={store}>
			 { <RouterContext {...renderProps}/> }
			 </Provider>
			 );

			 if ( getCurrentUrl() === reqUrl ) {
			 res.render('index', { html, scriptSrcs, reduxState, styleSrc });
			 } else {
			 res.redirect(302, getCurrentUrl());
			 }
			 unsubscribe();
			 })
			 .catch((err) => {
			 unsubscribe();
			 next(err);
			 });


			 function getReduxPromise () {
			 let { query, params } = renderProps;
			 let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
			 let promise = comp.fetchData ?
			 comp.fetchData({ query, params, store, history }) :
			 Promise.resolve();

			 return promise;
			 }*/
		} else {
			res.status(404).send('Not found');
		}
	});

	/*function subscribeUrl () {
		let currentUrl = location.pathname + location.search;
		let unsubscribe = history.listen((newLoc)=> {
				if (newLoc.action === 'PUSH') {
					currentUrl = newLoc.pathname + newLoc.search;
				}
		});

		return [ ()=> currentUrl, unsubscribe];
	}*/
});

app.listen(port, function(){
	console.log(`Server is running at localhost:${port} `);
});
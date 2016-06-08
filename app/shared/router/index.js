'use strict';

import React from 'react';
import Article from '../components/article';
import Home from '../components/home';

//import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
//import configureStore from 'store/configureStore';

export default function router(history) {

	return (
		<Router history={history}>
			<Route path="/" component={Home} />
			<Route path="/article" component={Article} />
			<Route path="/article/:slug" component={Article} />
		</Router>
	);

}

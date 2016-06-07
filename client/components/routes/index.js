import React from 'react';
import {Route} from 'react-router';
import article from '../app/article';
import home from '../app/home';

const Routes =  <Route>
                    <Route path="/" component={home} />
                    <Route path="article" component={article} />
                </Route>

export default Routes

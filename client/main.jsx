'use strict'

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';

import store from './store';

import Home from './components/Home';
import EnhancedSceneContainer from './components/SceneContainer';
import NotFound from './components/NotFound';

render(
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/spacechat" component={EnhancedSceneContainer} />
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('app')
);


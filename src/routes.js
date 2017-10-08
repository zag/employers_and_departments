import {IndexRoute, Route , Redirect} from 'react-router'
// import React from 'react';
import React, { Component,PropTypes } from 'react';
import App from './components/App/App';

import UpMenu from './components/UpMenu/UpMenu';
import Departments from './components/Departments/Departments';
import Employers from './components/Employers/Employers'
class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Page Not Found.</h1>
        <p>Go to </p>
      </div>
    )
  }
}

class Fetch extends React.Component {
  render() {
    return (
      <div>
        <h1>Fetch</h1>
        <p>Go to </p>
      </div>
    )
  }
}

//  const Departments = Fetch;
//  const Employers = Fetch;
export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    const { auth: { user }} = store.getState();
    if (!user) { // for example
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
        cb();
    };
    /**
     * Please keep routes in alphabetical order
    */ 
     return (
      <Route path="/" component={App}>
       <Redirect from="/" to="/departments"/>
        <Route  path="departments" component={Departments}></Route>
        <Route  path="employers" component={Employers}></Route>
         { /* Catch all route */ }
         <Route path="*" component={PageNotFound} ></Route>
       </Route >
    );

};

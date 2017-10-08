import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as Redux } from 'react-redux';
// import {
//   ReduxRouter,
//   routerStateReducer,
//   reduxReactRouter,
//   push,
// } from 'redux-router'
import { Router, hashHistory, browserHistory  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createHashHistory,createHistory } from 'history';
import createRoutes from './routes';
import createStore from './redux';

const _history = browserHistory;
const store = createStore( _history );
const history = syncHistoryWithStore(_history, store);
store.dispatch({type:'RESET'})
const routes = createRoutes(store, {
  dispatch: store.dispatch,
  getState: store.getState
});
console.log(routes);

function renderAll () {
  ReactDOM.render(
    <Redux store={store}>
      <Router history={history} routes={routes} />
    </Redux>,
    document.getElementById('app')
  );
}

store.subscribe(renderAll);
store.subscribe(() => {
  const { actions } = store.getState();

  localStorage.setItem('employers', JSON.stringify( actions.employers));
  localStorage.setItem('departmens', JSON.stringify( actions.departmens));
  
});
renderAll();

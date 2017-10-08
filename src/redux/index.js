import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux';

import { routerMiddleware, routerReducer } from 'react-router-redux';
import {createLogger} from 'redux-logger';
import reducer_actions from './modules/actions';

import {
  enableBatching
} from 'redux-batched-actions'

export default function createStore(history, client) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);
 
  const middleware = [
    reduxRouterMiddleware,
    createLogger(),
    
    // thunk,
    // createSocketExampleMiddleware()
  ];

 
    let finalCreateStore = applyMiddleware(...middleware);//(_createStore);
  
    
    function createRootReducer() {
      return combineReducers({
        routing: routerReducer,
        actions: reducer_actions
      });
    }
  console.log({finalCreateStore});
  const reducer = createRootReducer();
  const store = _createStore(enableBatching(reducer), applyMiddleware(...middleware));
  return store;
}

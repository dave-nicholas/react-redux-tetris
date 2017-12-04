import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerForBrowser } from 'redux-little-router';
import { routes } from '../routes';
import App from './reducers';

const storeWithDevTools =
  process.env.REACT_APP_ENV === 'dev' &&
  window.hasOwnProperty('__REDUX_DEVTOOLS_EXTENSION__')
    ? compose(window.__REDUX_DEVTOOLS_EXTENSION__())(createStore)
    : createStore;

const { reducer, middleware, enhancer } = routerForBrowser({
  routes
});

const createStoreWithFirebase = compose(
  enhancer,
  applyMiddleware(middleware),
  applyMiddleware(thunk)
)(storeWithDevTools);

const rootReducer = combineReducers({
  App,
  router: reducer
});

export default createStoreWithFirebase(rootReducer, {});

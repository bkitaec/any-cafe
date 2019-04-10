/**
 * Creates the Redux store
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import createRouterMiddleware from 'react-router-redux/lib/middleware';
import reduxThunk from 'redux-thunk';

import Immutable from 'utils/immutable/Immutable';
import anycafeMiddleware from 'store/middleware/AnycafeMiddleware';
import reducers from 'store/reducers/reducer';

const initialState = Immutable({});

const routerHistoryMiddleware = createRouterMiddleware(createBrowserHistory());

const middleware = [routerHistoryMiddleware, reduxThunk, anycafeMiddleware];

let enhance = null;

let devTool = (f) => f;
if (typeof window !== 'undefined') {
    devTool = window.devToolsExtension ? window.devToolsExtension() : (f) => f;
}

enhance = compose(
    applyMiddleware(...middleware),
    devTool
);

// Create the Redux store
const store = createStore(reducers, initialState, enhance);
export default store;

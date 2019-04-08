/**
 * Each folder in this directory structure /reducers represents a slice
 * of the application state. Navigating this directory structure should be
 * the equivalent of navigating the app state.
 */
import { combineReducers } from 'redux';

import app from './app/appReducer';

const rootReducer = combineReducers({
    app,
});

export default rootReducer;

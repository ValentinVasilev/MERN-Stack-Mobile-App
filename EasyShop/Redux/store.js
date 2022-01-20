/* eslint-disable prettier/prettier */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {ThunkMiddleware} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

const reducers = combineReducers({
  // cart reducer
});

const store = createStore(reducers, composeWithDevTools(ThunkMiddleware));

export default store;

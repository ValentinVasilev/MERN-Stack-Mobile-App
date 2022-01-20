/* eslint-disable prettier/prettier */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {ThunkMiddleware} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import cartItems from './reducers/cartItem';

const reducers = combineReducers({
  cartItems: cartItems,
});

const store = createStore(reducers, composeWithDevTools(ThunkMiddleware));

export default store;

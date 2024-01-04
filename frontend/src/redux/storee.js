import {combineReducers, applyMiddleware, createStore } from 'redux';

import userReducer from './reducers/userReducer';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import userInfoReducer from './reducers/userInfoReducer';

const rootReducer = combineReducers({userReducer, userInfoReducer});

export default storee = createStore(rootReducer, applyMiddleware(thunk));
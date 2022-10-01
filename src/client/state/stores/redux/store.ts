import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reduxReducers } from '../../reducers';

export const store = createStore(reduxReducers, {}, applyMiddleware(thunk));

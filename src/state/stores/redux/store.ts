import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reduxReducers } from '../../state-system/reducers';

export const store = createStore(reduxReducers, {}, applyMiddleware(thunk));

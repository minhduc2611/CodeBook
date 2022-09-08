import { combineReducers } from 'redux';
import repositoriesReducer from './repository';

export * as CellReducer from './cell';

export const reduxReducers = combineReducers({
  repositories: repositoriesReducer,
});

export type RootState = ReturnType<typeof reduxReducers>;

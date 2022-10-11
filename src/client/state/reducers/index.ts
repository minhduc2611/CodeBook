import { combineReducers } from 'redux';
import articleListReducer from './articleList/articleList.reducer';
import repositoriesReducer from './repository/repository.reducer';

export * as CellReducer from './article/cell.reducer';
export * as articleListActions from './articleList/articleList.action-creator';

export const reduxReducers = combineReducers({
  repositories: repositoriesReducer,
  articleList: articleListReducer
});

export type RootState = ReturnType<typeof reduxReducers>;

import { RepositoriesActionType } from '../action-types/repository';

interface SearchRepositoriesAction {
  type: RepositoriesActionType.SEARCH_REPOSITORIES;
}

interface SearchRepositoriesSuccessAction {
  type: RepositoriesActionType.SEARCH_REPOSITORIES_SUCCESS;
  payload: string[];
}

interface SearchRepositoriesErrorAction {
  type: RepositoriesActionType.SEARCH_REPOSITORIES_ERROR;
  payload: string;
}

export type RepositoriesAction =
  | SearchRepositoriesAction
  | SearchRepositoriesSuccessAction
  | SearchRepositoriesErrorAction;

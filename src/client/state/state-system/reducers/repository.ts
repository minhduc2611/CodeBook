import { RepositoriesActionType } from '../action-types/repository';
import { RepositoriesAction } from '../actions/repository';

export interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}

export const initialState = {
  loading: false,
  error: null,
  data: []
};

const reducer = (
  state: RepositoriesState = initialState,
  action: RepositoriesAction
): RepositoriesState => {
  switch (action.type) {
    case RepositoriesActionType.SEARCH_REPOSITORIES:
      return { loading: true, error: null, data: [] };
    case RepositoriesActionType.SEARCH_REPOSITORIES_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case RepositoriesActionType.SEARCH_REPOSITORIES_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default reducer;

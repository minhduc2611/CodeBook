import axios from 'axios';
import { Dispatch } from 'redux';
import { RepositoriesActionType } from '../action-types/repository';
import { RepositoriesAction } from '../actions/repository';

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<RepositoriesAction>) => {
    dispatch({
      type: RepositoriesActionType.SEARCH_REPOSITORIES,
    });

    try {
      const { data } = await axios.get(
        'https://registry.npmjs.org/-/v1/search',
        {
          params: {
            text: term,
          },
        },
      );

      const names = data.objects.map((result: any) => {
        return result.package.name;
      });

      dispatch({
        type: RepositoriesActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: names,
      });
    } catch (err: any) {
      dispatch({
        type: RepositoriesActionType.SEARCH_REPOSITORIES_ERROR,
        payload: err.message,
      });
    }
  };
};

import { Dispatch } from 'redux';
import { fetchAllArticle } from './../../../../client/graphql/queries-creator/articles';
import { ArticleListActionType } from './articleList.action-types';
import { ArticleListAction } from './articleList.actions';

export const fetchArticleList = () => {
  return async (dispatch: Dispatch<ArticleListAction>) => {
    dispatch({
      type: ArticleListActionType.FETCH_ARTICLE_LIST
    });
    try {
      const data = await fetchAllArticle();
      dispatch({
        type: ArticleListActionType.FETCH_ARTICLE_LIST_SUCCESS,
        payload: data
      });
    } catch (err: any) {
      dispatch({
        type: ArticleListActionType.FETCH_ARTICLE_LIST_ERROR,
        payload: err.message
      });
    }
  };
};

import { Article } from './../../../../server/article/entities/article.entity';
import { ArticleListActionType } from './articleList.action-types';
import { ArticleListAction } from './articleList.actions';

export interface ArticleListState {
  loading: boolean;
  error: string | null;
  data: Article[];
}

export const initialState = {
  loading: false,
  error: null,
  data: []
};

const reducer = (
  state: ArticleListState = initialState,
  action: ArticleListAction
): ArticleListState => {
  switch (action.type) {
    case ArticleListActionType.FETCH_ARTICLE_LIST:
      return { loading: true, error: null, data: [] };
    case ArticleListActionType.FETCH_ARTICLE_LIST_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ArticleListActionType.FETCH_ARTICLE_LIST_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};
export default reducer;

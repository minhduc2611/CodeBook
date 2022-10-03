import { Article } from "./../../../../server/article/entities/article.entity";
import { ArticleListActionType } from "./articleList.action-types";

interface SearchRepositoriesAction {
  type: ArticleListActionType.FETCH_ARTICLE_LIST;
}

interface SearchRepositoriesSuccessAction {
  type: ArticleListActionType.FETCH_ARTICLE_LIST_SUCCESS;
  payload: Article[];
}

interface SearchRepositoriesErrorAction {
  type: ArticleListActionType.FETCH_ARTICLE_LIST_ERROR;
  payload: string;
}

export type ArticleListAction =
  | SearchRepositoriesAction
  | SearchRepositoriesSuccessAction
  | SearchRepositoriesErrorAction;

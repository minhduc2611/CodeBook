import { Article } from '../../../../server/article/entities/article.entity';
import { Nullable, UIState } from '../base';
import { Cell } from './cell';

export type UIArticleState = UIState<
  Article,
  {
    originalArticle: Nullable<Article>;
  }
>;

export interface ArticleState {
  title: string;
  id: string;
  slug: string;
  cellOrder: string[];
  article: {
    [key: string]: Cell;
  };
  originalArticle: Article | null;
  isUnsavedChanges?: boolean;
}

// type UIArticle = ArrayToObjectByKey<Cell[], 'id'>;

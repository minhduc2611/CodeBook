import { Article } from "./../../../server/article/entities/article.entity";
import { CellObject } from "./../../../server/article/entities/cell.entity";

export type CellTypes = 'code' | 'text';
export interface Cell extends CellObject{}
export interface ArticleState {
  title: string, 
  id: string, 
  slug: string,
  cellOrder: string[];
  article: {
    [key: string]: Cell;
  };
  originalArticle : Article | null;
}

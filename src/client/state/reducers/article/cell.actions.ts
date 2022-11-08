import { ArticleState } from '../../types/entities/article';
import { CellTypes } from '../../types/entities/cell';
import { Article } from './../../../../server/article/entities/article.entity';
import { CellActionType } from './cell.action-types';

export type Direction = 'up' | 'down';
export interface IMoveCellAction {
  type: CellActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface IDeleteCellAction {
  type: CellActionType.DELETE_CELL;
  payload: string;
}

export interface IInsertCellBeforeAction {
  type: CellActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: CellTypes;
  };
}

export interface IInsertCellAfterAction {
  type: CellActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface IUpdateCellAction {
  type: CellActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface ISetCellsAction {
  type: CellActionType.SET_CELLS;
  payload: {
    article: Article;
  };
}

export interface IUpdateArticleAction {
  type: CellActionType.UPDATE_CELLS;
  payload: {
    article: Article;
  };
}

export interface IUpdateArticleTitleAction {
  type: CellActionType.UPDATE_ARTICLE_TITLE;
  payload: {
    text: string;
  };
}

export interface IUpdateArticlePropAction {
  type: CellActionType.UPDATE_ARTICLE_PROP;
  payload: {
    partial: Partial<ArticleState>;
  };
}

export type ICellAction =
  | IMoveCellAction
  | IDeleteCellAction
  | IInsertCellBeforeAction
  | IInsertCellAfterAction
  | IUpdateCellAction
  | ISetCellsAction
  | IUpdateArticleAction
  | IUpdateArticleTitleAction
  | IUpdateArticlePropAction;

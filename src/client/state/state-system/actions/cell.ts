import { Article } from 'src/server/article/entities/article.entity';
import { CellTypes } from '../../types/cell';
import { CellActionType } from '../action-types/cell';

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

export type ICellAction =
  | IMoveCellAction
  | IDeleteCellAction
  | IInsertCellBeforeAction
  | IInsertCellAfterAction
  | IUpdateCellAction
  | ISetCellsAction
  | IUpdateArticleAction;

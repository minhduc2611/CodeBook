import { CellTypes } from '../../types/cell';
import { CellActionType } from '../action-types/cell';
import {
  Direction,
  IDeleteCellAction,
  IInsertCellAfterAction,
  IInsertCellBeforeAction,
  IMoveCellAction,
  IUpdateCellAction
} from '../actions/cell';

export const updateCell = (id: string, content: string): IUpdateCellAction => {
  return {
    type: CellActionType.UPDATE_CELL,
    payload: {
      id,
      content
    }
  };
};

export const deleteCell = (id: string): IDeleteCellAction => {
  return {
    type: CellActionType.DELETE_CELL,
    payload: id
  };
};

export const moveCell = (id: string, direction: Direction): IMoveCellAction => {
  return {
    type: CellActionType.MOVE_CELL,
    payload: {
      id,
      direction
    }
  };
};

export const insertCellBefore = (
  id: string,
  cellType: CellTypes
): IInsertCellBeforeAction => {
  return {
    type: CellActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType
    }
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): IInsertCellAfterAction => {
  return {
    type: CellActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType
    }
  };
};

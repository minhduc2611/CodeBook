import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { Cell, CellsState } from '../../types/cell';
import { CellActionType } from '../action-types/cell';
import { ICellAction } from '../actions/cell';

const sampleCode = `
import ReactDOM from 'react-dom';
import React from 'react';

const a = 1;
const App = () => {
  return <div>Hello world -- {a}</div> 
}


ReactDOM.render(<App />, document.querySelector('#root'));
                `;

export const initialState: CellsState = {
  loading: false,
  error: null,
  order: ["12121121211212112121"],
  data: {
    '12121121211212112121': {
      id: '12121121211212112121',
      type: 'code',
      content: sampleCode,
    },
  },
};

const reducer = produce(
  (state: CellsState = initialState, action: ICellAction) => {
    switch (action.type) {
      case CellActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content
        return state;
      case CellActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);

        return;
      case CellActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return;
      case CellActionType.INSERT_CELL_BEFORE:
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: uuidv4(),
        };

        state.data[cell.id] = cell;

        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        if (foundIndex < 0) {
          state.order.push(cell.id);
        } else {
          state.order.splice(foundIndex, 0, cell.id);
        }

        return state;
      case CellActionType.INSERT_CELL_AFTER:
        const newCell: Cell = {
          content: '',
          type: action.payload.type,
          id: uuidv4(),
        };

        state.data[newCell.id] = newCell;

        const foundCellIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        if (foundCellIndex < 0) {
          state.order.unshift(newCell.id);
        } else {
          state.order.splice(foundCellIndex + 1, 0, newCell.id);
        }
        return state;
      default:
        return state;
    }
  }
);

export default reducer;

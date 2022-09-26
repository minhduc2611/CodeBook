import { Cell } from 'dist/server/article/entities/cell.entity';
import produce from 'immer';
import { Article } from 'src/server/article/entities/article.entity';
import { v4 as uuidv4 } from 'uuid';
import { ArticleState } from '../../types/cell';
import { CellActionType } from '../action-types/cell';
import { ICellAction } from '../actions/cell';
import { transform } from '../article/transform';

export const initialState: ArticleState = {
  id: '',
  title: '',
  slug: '',
  cellOrder: [],
  article: {},
  originalArticle: null
};

const reducer = produce(
  (state: ArticleState = initialState, action: ICellAction) => {
    switch (action.type) {
      case CellActionType.SET_CELLS:
        const { article } = action.payload;
        let articleState: ArticleState = transform<Article, ArticleState>(
          article
        );
        return { state, ...articleState };
      case CellActionType.UPDATE_CELLS:
        const { article: article2 } = action.payload;
        let articleState2: ArticleState = transform<Article, ArticleState>(
          article2
        );
        return { state, ...articleState2 };
      case CellActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.article[id].content = content;
        return state;
      case CellActionType.DELETE_CELL:
        delete state.article[action.payload];
        state.cellOrder = state.cellOrder.filter((id) => id !== action.payload);
        return;
      case CellActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.cellOrder.findIndex(
          (id) => id === action.payload.id
        );
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex > state.cellOrder.length - 1) {
          return;
        }
        state.cellOrder[index] = state.cellOrder[targetIndex];
        state.cellOrder[targetIndex] = action.payload.id;
        return;
      case CellActionType.INSERT_CELL_BEFORE:
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: uuidv4()
        };
        state.article[cell.id] = cell;
        const foundIndex = state.cellOrder.findIndex(
          (id) => id === action.payload.id
        );

        if (foundIndex < 0) {
          state.cellOrder.push(cell.id);
        } else {
          state.cellOrder.splice(foundIndex, 0, cell.id);
        }

        return state;
      case CellActionType.INSERT_CELL_AFTER:
        const newCell: Cell = {
          content: '',
          type: action.payload.type,
          id: uuidv4()
        };

        state.article[newCell.id] = newCell;

        const foundCellIndex = state.cellOrder.findIndex(
          (id) => id === action.payload.id
        );

        if (foundCellIndex < 0) {
          state.cellOrder.unshift(newCell.id);
        } else {
          state.cellOrder.splice(foundCellIndex + 1, 0, newCell.id);
        }
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
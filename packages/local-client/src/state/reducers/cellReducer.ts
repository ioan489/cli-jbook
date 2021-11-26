import produce from 'immer';
import { Reducer } from 'redux';
import { randomBytes } from 'crypto';
import { Action } from '../actions/interfaces';
import { ActionTypes } from '../actions/types';
import { Cell } from '../cell';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellReducer: Reducer<CellState, Action> = produce(
  (state: CellState = initialState, action: Action) => {
    switch (action.type) {
      case ActionTypes.SAVE_CELLS_ERROR:
        state.error = action.payload;

        return state;
      case ActionTypes.FETCH_CELLS:
        state.loading = true;
        state.error = null;

        return state;
      case ActionTypes.FETCH_CELLS_COMPLETE:
        state.order = action.payload.map((cell) => cell.id);
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellState['data']);

        return state;
      case ActionTypes.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload;

        return state;
      case ActionTypes.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;

        return state;
      case ActionTypes.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return state;
      case ActionTypes.INSERT_CELL:
        const cell: Cell = {
          id: randomBytes(4).toString('hex'),
          type: action.payload.type,
          content: '',
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
      case ActionTypes.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);

        return state;
      default:
        return state;
    }
  }
);

export default cellReducer;

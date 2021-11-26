import { Dispatch } from 'redux';
import axios from 'axios';
import {
  MoveCellAction,
  DeleteCellAction,
  InsertCellBeforeAction,
  UpdateCellAction,
  Action,
} from './interfaces';
import { ActionTypes } from './types';
import { CellTypes } from '../cell';
import { Cell } from '../cell';
import bundle from '../../bundler';
import { RootState } from '../reducers';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const moveCell = (
  id: string,
  direction: 'up' | 'down'
): MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload: id,
  };
};

export const insertCellBefore = (
  id: string,
  type: CellTypes
): InsertCellBeforeAction => {
  return {
    type: ActionTypes.INSERT_CELL,
    payload: {
      id,
      type,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.CREATE_BUNDLE,
      payload: {
        cellId,
      },
    });

    const result = (await bundle(input)) as { code: any; error: string };

    dispatch({
      type: ActionTypes.COMPLETED_BUNDLE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          err: result.error,
        },
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.FETCH_CELLS });

    try {
      const { data }: { data: Cell[] } = await axios.get('/cells');

      dispatch({
        type: ActionTypes.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: ActionTypes.FETCH_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();

    const cells = order.map((id) => data[id]);

    try {
      await axios.post('/cells', { cells });
    } catch (err: any) {
      dispatch({
        type: ActionTypes.SAVE_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
};

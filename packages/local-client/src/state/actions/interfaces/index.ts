import { ActionTypes } from '../types';
import { CellTypes } from '../../cell';
import { Cell } from '../../cell';

export interface MoveCellAction {
  type: ActionTypes.MOVE_CELL;
  payload: {
    id: string;
    direction: 'up' | 'down';
  };
}

export interface DeleteCellAction {
  type: ActionTypes.DELETE_CELL;
  payload: string;
}

export interface InsertCellBeforeAction {
  type: ActionTypes.INSERT_CELL;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface UpdateCellAction {
  type: ActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface CreateBundleAction {
  type: ActionTypes.CREATE_BUNDLE;
  payload: {
    cellId: string;
  };
}

export interface CompletedBundleAction {
  type: ActionTypes.COMPLETED_BUNDLE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface FetchCellsAction {
  type: ActionTypes.FETCH_CELLS;
}

export interface FetchCellsCompleteAction {
  type: ActionTypes.FETCH_CELLS_COMPLETE;
  payload: Cell[];
}

export interface FetchCellsErrorAction {
  type: ActionTypes.FETCH_CELLS_ERROR;
  payload: string;
}

export interface SaveCellsErrorAction {
  type: ActionTypes.SAVE_CELLS_ERROR;
  payload: string;
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | UpdateCellAction
  | CreateBundleAction
  | CompletedBundleAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsErrorAction;

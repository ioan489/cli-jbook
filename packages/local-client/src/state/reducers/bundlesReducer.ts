import produce from 'immer';
import { Reducer } from 'redux';
import { Action } from '../actions/interfaces';
import { ActionTypes } from '../actions/types';

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const bundlesReducer: Reducer<BundlesState, Action> = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionTypes.CREATE_BUNDLE:
        state[action.payload.cellId] = {
          loading: true,
          code: '',
          err: '',
        };
        return state;
      case ActionTypes.COMPLETED_BUNDLE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    }
  }
);

export default bundlesReducer;

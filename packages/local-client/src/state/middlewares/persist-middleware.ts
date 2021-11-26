import { Dispatch } from 'redux';
import { Action } from '../actions/interfaces';
import { ActionTypes } from '../actions/types';
import { saveCells } from '../actions';
import { RootState } from '../reducers';

export const persistMiddlware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;

  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [
          ActionTypes.MOVE_CELL,
          ActionTypes.UPDATE_CELL,
          ActionTypes.INSERT_CELL,
          ActionTypes.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};

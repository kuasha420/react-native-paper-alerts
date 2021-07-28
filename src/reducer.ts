import merge from './merge';
import { AlertAction, AlertsState } from './type';

export const initialState: AlertsState = {
  visible: false,
  options: {
    cancelable: false,
  },
};

const reducer = (state: AlertsState, action: AlertAction) => {
  switch (action.type) {
    case 'ALERT':
      return merge(initialState, action.payload);

    case 'PROMPT':
      return merge(initialState, action.payload);

    case 'DISMISS':
      return merge(state, initialState);

    default:
      return state;
  }
};

export default reducer;

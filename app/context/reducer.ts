// reducer.ts

import { AppState, Action, ActionType } from "@lib/types/appContextTypes";

export const initialState: AppState = {
  user: null,
  messages: {
    loading: true,
    error: null,
    data: [],
  },
  getMessages: async () => {},
};

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case ActionType.SET_USER:
      return { ...state, user: action.payload };
    case ActionType.FETCH_MESSAGES_START:
      return {
        ...state,
        messages: { ...state.messages, loading: true, error: null },
      };
    case ActionType.FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: { loading: false, error: null, data: action.payload },
      };
    case ActionType.FETCH_MESSAGES_ERROR:
      return {
        ...state,
        messages: { loading: false, error: action.payload, data: [] },
      };
    default:
      return state;
  }
}

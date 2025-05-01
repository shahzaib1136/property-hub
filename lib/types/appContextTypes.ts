import { MessageResponseType } from "@lib/types/messages";

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  bookmarks: string[];
}

export interface MessagesState {
  loading: boolean;
  error: string | null;
  data: MessageResponseType[];
}

export interface AppState {
  user: User | null;
  messages: MessagesState;
  getMessages: () => Promise<void>;
}

export enum ActionType {
  SET_USER = "SET_USER",
  FETCH_MESSAGES_START = "FETCH_MESSAGES_START",
  FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS",
  FETCH_MESSAGES_ERROR = "FETCH_MESSAGES_ERROR",
}

export type Action =
  | { type: ActionType.SET_USER; payload: User | null }
  | { type: ActionType.FETCH_MESSAGES_START }
  | { type: ActionType.FETCH_MESSAGES_SUCCESS; payload: MessageResponseType[] }
  | { type: ActionType.FETCH_MESSAGES_ERROR; payload: string };

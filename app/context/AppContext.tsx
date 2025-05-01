"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { useSession } from "next-auth/react"; // To access session data
import { fetchUser } from "@lib/api/user";
import { AppState, Action, ActionType } from "@lib/types/appContextTypes";
import { appReducer, initialState } from "@/app/context/reducer";
import { fetchMessages } from "@lib/api/messages";
import { ErrorType } from "@lib/utils/response";

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  getMessages: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const { data: session } = useSession(); // Get session data from NextAuth
  const { id } = session?.user || {};

  const getMessages = async () => {
    try {
      dispatch({ type: ActionType.FETCH_MESSAGES_START });

      const messagesRes = (await fetchMessages()) || [];

      dispatch({
        type: ActionType.FETCH_MESSAGES_SUCCESS,
        payload: messagesRes,
      });
    } catch (error: unknown) {
      const err = error as ErrorType;
      dispatch({
        type: ActionType.FETCH_MESSAGES_ERROR,
        payload: err.message || "Failed to fetch messages",
      });
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch user
        const user = await fetchUser(id as string);
        dispatch({ type: ActionType.SET_USER, payload: user });

        await getMessages();
      } catch (error: unknown) {
        const err = error as ErrorType;

        dispatch({
          type: ActionType.FETCH_MESSAGES_ERROR,
          payload: err.message || "Something went wrong",
        });

        console.error("Error loading initial data", error);
      }
    };

    if (!id) return;

    fetchInitialData();
  }, [id]);

  return (
    <AppContext.Provider value={{ state, dispatch, getMessages }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};

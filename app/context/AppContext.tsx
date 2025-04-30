"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useSession } from "next-auth/react"; // To access session data
import { fetchUser } from "@lib/api/user";

interface IUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  bookmarks: string[];
}

interface AppContextType {
  user: IUser | null;
  setUser: (userData: IUser | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { data: session } = useSession(); // Get session data from NextAuth
  const { id } = session?.user || {};

  // Update user data in the context
  const updateUser = (userData: IUser | null) => {
    setUser(userData); // Set user data in context
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUser(id as string);

        if (userData) {
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        updateUser(null);
      }
    };

    if (!id) return;

    fetchUserData();
  }, [id]);

  return (
    <AppContext.Provider value={{ user, setUser: updateUser }}>
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

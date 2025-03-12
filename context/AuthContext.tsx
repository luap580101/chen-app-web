"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import AuthService from "@/services/AuthService";

// 型別定義
export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export interface CurrentUser {
  user: User;
  token: string;
}

interface AuthContextType {
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
}

// 預設 context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// provider props
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // 進來頁面自動檢查 localStorage
  useEffect(() => {
    const userData = AuthService.getCurrentUser();
    if (userData) {
      setCurrentUser(userData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 快速 Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必須用在 AuthProvider 內部");
  }
  return context;
};

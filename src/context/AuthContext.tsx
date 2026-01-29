"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Wrap state update in a microtask to avoid synchronous setState
    const initializeAuth = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const user = JSON.parse(savedUser) as User;
        setUser(user);
      }
      setLoading(false);
    };

    // Use setTimeout to schedule after first render
    setTimeout(initializeAuth, 0);
  }, []);

  const login = (email: string) => {
    const userObj = { email };
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
    router.push("/"); // redirect to dashboard after login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

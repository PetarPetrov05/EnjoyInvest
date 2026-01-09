"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, AuthState, LoginCredentials, RegisterData } from "@/lib/types/auth";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  getAuthHeader: () => Record<string, string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = (typeof window !== "undefined")
  ? `${window.location.protocol}//${window.location.hostname}:8080/api/auth`
  : "http://localhost:8080/api/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const logout = () => {
    localStorage.removeItem("enjoy-transport-token");
    localStorage.removeItem("enjoy-transport-user");
    setAuthState({ user: null, isLoading: false, isAuthenticated: false });
  };

  // Load user & token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("enjoy-transport-user");
    const storedToken = localStorage.getItem("enjoy-transport-token");

    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser) as User;
        setAuthState({ user, isLoading: false, isAuthenticated: true });
      } catch {
        logout();
      }
    } else {
      setAuthState({ user: null, isLoading: false, isAuthenticated: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buildMinimalUser = (opts: {
    email: string;
    username?: string;
    name?: string;
    roles?: string[];
    companyName?: string | null;
  }): User => {
    const roles = opts.roles || [];
    return {
      // satisfy required User fields (placeholders until full profile fetched)
      id: "",
      createdAt: new Date().toISOString(),
      email: opts.email,
      username: opts.username || opts.email.split("@")[0],
      name: opts.name || opts.email.split("@")[0],
      roles,
      role: roles.length ? roles[0].toLowerCase() : "user",
      isApproved: true,
      companyName: opts.companyName ?? null,
    } as unknown as User;
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        return false;
      }

      const data = await res.json();
      const token = data.token;
      const roles: string[] = data.roles || [];

      const user = buildMinimalUser({ email: credentials.email, roles });

      localStorage.setItem("enjoy-transport-token", token);
      localStorage.setItem("enjoy-transport-user", JSON.stringify(user));

      setAuthState({ user, isLoading: false, isAuthenticated: true });
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        return false;
      }

      const response = await res.json();
      const token = response.token;
      const roles: string[] = response.roles || [];

      const createdUser = buildMinimalUser({
        email: data.email,
        username: data.username,
        name: data.name,
        roles,
        companyName: (data as any).companyName ?? null,
      });

      localStorage.setItem("enjoy-transport-token", token);
      localStorage.setItem("enjoy-transport-user", JSON.stringify(createdUser));

      setAuthState({ user: createdUser, isLoading: false, isAuthenticated: true });
      return true;
    } catch (err) {
      console.error("Registration failed:", err);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const updateUser = (updates: Partial<User>) => {
    setAuthState((prev) => {
      if (!prev.user) return prev;
      const updatedUser = { ...prev.user, ...updates };
      localStorage.setItem("enjoy-transport-user", JSON.stringify(updatedUser));
      return { ...prev, user: updatedUser };
    });
  };

  const getAuthHeader = (): Record<string, string> => {
    const token = localStorage.getItem("enjoy-transport-token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Debug: observe authState changes
  useEffect(() => {
    console.log("Auth state changed:", {
      isAuthenticated: authState.isAuthenticated,
      user: authState.user,
    });
  }, [authState.isAuthenticated, authState.user]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateUser,
        getAuthHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
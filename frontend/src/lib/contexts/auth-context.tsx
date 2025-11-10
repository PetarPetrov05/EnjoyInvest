"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, AuthState, LoginCredentials, RegisterData } from "@/lib/types/auth"

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  updateUser: (user: Partial<User>) => void
  getAuthHeader: () => Record<string, string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 🌍 Change this depending on your backend base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/auth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // ✅ Load user & token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("enjoy-transport-user")
    const storedToken = localStorage.getItem("enjoy-transport-token")

    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser)
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
      } catch {
        logout()
      }
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
    }
  }, [])

  // ✅ LOGIN (gets JWT from backend)
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      if (!res.ok) throw new Error("Invalid credentials")

      const data = await res.json()
      const { user, token } = data

      localStorage.setItem("enjoy-transport-user", JSON.stringify(user))
      localStorage.setItem("enjoy-transport-token", token)

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })

      return true
    } catch (err) {
      console.error("Login failed:", err)
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return false
    }
  }

  // ✅ REGISTER (returns user + JWT)
  const register = async (data: RegisterData): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Registration failed")

      const response = await res.json()
      const { user, token } = response

      localStorage.setItem("enjoy-transport-user", JSON.stringify(user))
      localStorage.setItem("enjoy-transport-token", token)

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })

      return true
    } catch (err) {
      console.error("Registration failed:", err)
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return false
    }
  }

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("enjoy-transport-user")
    localStorage.removeItem("enjoy-transport-token")
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  // ✅ UPDATE USER LOCALLY
  const updateUser = (updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates }
      localStorage.setItem("enjoy-transport-user", JSON.stringify(updatedUser))
      setAuthState((prev) => ({
        ...prev,
        user: updatedUser,
      }))
    }
  }

  // ✅ Helper to attach JWT in headers for protected routes
  const getAuthHeader = (): Record<string, string> => {
    const token = localStorage.getItem("enjoy-transport-token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

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
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

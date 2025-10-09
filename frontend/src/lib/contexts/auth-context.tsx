"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, AuthState, LoginCredentials, RegisterData } from "@/lib/types/auth"

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@enjoytransport.com",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
    isApproved: true,
  },
  {
    id: "2",
    name: "Jane Business",
    email: "jane@business.com",
    role: "approved",
    createdAt: "2024-01-02T00:00:00Z",
    isApproved: true,
    companyName: "Jane's Logistics",
  },
  {
    id: "3",
    name: "Bob User",
    email: "bob@example.com",
    role: "regular",
    createdAt: "2024-01-03T00:00:00Z",
    isApproved: true,
  },
  {
    id: "4",
    name: "Alice Pending",
    email: "alice@newbusiness.com",
    role: "regular",
    createdAt: "2024-01-04T00:00:00Z",
    isApproved: false,
    companyName: "Alice's Transport Co",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // Simulate checking for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("enjoy-transport-user")
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser)
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          })
        } catch {
          localStorage.removeItem("enjoy-transport-user")
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          })
        }
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    }

    // Simulate network delay
    setTimeout(checkAuth, 1000)
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user by email (in real app, this would be server-side)
    const user = mockUsers.find((u) => u.email === credentials.email)

    if (user && credentials.password === "password123") {
      // In real app, password would be hashed and verified server-side
      localStorage.setItem("enjoy-transport-user", JSON.stringify(user))
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
      return true
    }

    setAuthState((prev) => ({ ...prev, isLoading: false }))
    return false
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === data.email)
    if (existingUser) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return false
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: data.accountType === "business" ? "regular" : "regular", // Business accounts start as regular, need approval
      createdAt: new Date().toISOString(),
      isApproved: data.accountType === "regular", // Regular users are auto-approved
      companyName: data.companyName,
      businessLicense: data.businessLicense,
    }

    // In real app, this would be saved to database
    mockUsers.push(newUser)
    localStorage.setItem("enjoy-transport-user", JSON.stringify(newUser))

    setAuthState({
      user: newUser,
      isLoading: false,
      isAuthenticated: true,
    })

    return true
  }

  const logout = () => {
    localStorage.removeItem("enjoy-transport-user")
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

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

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateUser,
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

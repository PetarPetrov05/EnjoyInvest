export type UserRole = "regular" | "approved" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: string
  isApproved: boolean
  companyName?: string
  businessLicense?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  accountType: "regular" | "business"
  companyName?: string
  businessLicense?: string
}

"use client"

import type React from "react"

import { useAuth } from "@/lib/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import type { UserRole } from "@/lib/types/auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
  requireApproval?: boolean
  fallbackPath?: string
}

export function ProtectedRoute({
  children,
  requiredRole,
  requireApproval = false,
  fallbackPath = "/login",
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(fallbackPath)
        return
      }

      if (user) {
        // Check if user needs approval
        if (requireApproval && !user.isApproved) {
          router.push("/pending-approval")
          return
        }

        // Check role requirements
        if (requiredRole) {
          const roleHierarchy: Record<UserRole, number> = {
            regular: 1,
            approved: 2,
            admin: 3,
          }

          if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
            router.push("/unauthorized")
            return
          }
        }
      }
    }
  }, [user, isLoading, isAuthenticated, requiredRole, requireApproval, router, fallbackPath])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  if (requireApproval && !user.isApproved) {
    return null
  }

  if (requiredRole) {
    const roleHierarchy: Record<UserRole, number> = {
      regular: 1,
      approved: 2,
      admin: 3,
    }

    if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
      return null
    }
  }

  return <>{children}</>
}

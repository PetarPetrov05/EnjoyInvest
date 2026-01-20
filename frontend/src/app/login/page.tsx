"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Truck } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { useAuth } from "@/lib/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Truck className="h-12 w-12 text-primary mx-auto animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Truck className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Welcome to Enjoy Transport</h1>
            <p className="text-muted-foreground mt-2">Sign in to your account or create a new one to get started.</p>
          </div>

          <div className="w-full">
            <div className="grid w-full grid-cols-2 gap-1 rounded-lg bg-muted p-1 mb-4">
              <button
                onClick={() => setActiveTab("login")}
                className={`rounded-md py-2 text-sm font-medium transition-all ${
                  activeTab === "login"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-cy="login-tab"
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`rounded-md py-2 text-sm font-medium transition-all ${
                  activeTab === "register"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-cy="register-tab"
              >
                Register
              </button>
            </div>

            <div>
              {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
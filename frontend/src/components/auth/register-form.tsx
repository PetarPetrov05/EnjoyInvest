"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
//import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/lib/contexts/auth-context"
import { useRouter } from "next/navigation"
import type { RegisterData } from "@/lib/types/auth"

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    accountType: "regular",
    companyName: "",
    businessLicense: "",
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { register, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match!")
      return
    }

    if (formData.accountType === "business" && !formData.companyName) {
      setError("Company name is required for business accounts.")
      return
    }

    const success = await register(formData)
    if (success) {
      if (formData.accountType === "business") {
        setSuccess(
          "Account created successfully! Your business account is pending approval. You can browse offers but cannot post until approved.",
        )
        setTimeout(() => router.push("/"), 3000)
      } else {
        router.push("/")
      }
    } else {
      setError("Email already exists. Please use a different email address.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    if (type === "radio") {
      setFormData((prev) => ({ ...prev, accountType: value as "regular" | "business" }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Join Enjoy Transport to access all features and save your favorite offers.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error}

          {success}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label>Account Type</Label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="accountType"
                  value="regular"
                  checked={formData.accountType === "regular"}
                  onChange={handleChange}
                  className="text-primary"
                  disabled={isLoading}
                />
                <span className="text-sm">Regular User (browse and save offers)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="accountType"
                  value="business"
                  checked={formData.accountType === "business"}
                  onChange={handleChange}
                  className="text-primary"
                  disabled={isLoading}
                />
                <span className="text-sm">Business Account (request to post offers)</span>
              </label>
            </div>
          </div>

          {formData.accountType === "business" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your company name"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessLicense">Business License (Optional)</Label>
                <Input
                  id="businessLicense"
                  name="businessLicense"
                  value={formData.businessLicense}
                  onChange={handleChange}
                  placeholder="Business license number"
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

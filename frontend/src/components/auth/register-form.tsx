"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { RegisterData } from "@/lib/types/auth";
import { registerUser } from "@/lib/data/register";

export function RegisterForm() {
  const { register, isLoading } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    name: "",
    email: "",
    password: "",
    accountType: "regular",
    companyName: "",
    businessLicense: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const ok = await register(formData);
    if (ok) {
      setSuccess("Registration successful.");
      router.push("/");
    } else {
      // AuthProvider.register returns false for failures (including email exists)
      setError("Registration failed (email may already exist).");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
      {success && <div className="text-sm text-green-600 mb-2">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>

        <button type="submit" disabled={isLoading} className="w-full py-2 px-4 bg-blue-600 text-white rounded">
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
function useAuth(): { register: any; isLoading: any; } {
  throw new Error("Function not implemented.");
}


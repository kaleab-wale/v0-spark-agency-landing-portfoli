"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { AuthUser, LoginCredentials, RegisterData } from "./types"
import { mockUsers } from "./mock-data"

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication
    const foundUser = mockUsers.find((u) => u.email === credentials.email && u.isActive)

    if (foundUser) {
      // In a real app, you'd verify the password hash here
      const authUser: AuthUser = {
        ...foundUser,
        token: `mock-jwt-token-${foundUser.id}`,
      }
      setUser(authUser)
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: "Invalid email or password" }
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === data.email)
    if (existingUser) {
      setIsLoading(false)
      return { success: false, error: "Email already registered" }
    }

    // Create new user (in real app, this would be an API call)
    const newUser: AuthUser = {
      id: mockUsers.length + 1,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      role: "BIDDER",
      isActive: true,
      createdAt: new Date(),
      token: `mock-jwt-token-${mockUsers.length + 1}`,
    }

    setUser(newUser)
    setIsLoading(false)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
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

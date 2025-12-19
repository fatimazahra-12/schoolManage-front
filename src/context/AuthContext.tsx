import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { auth } from '../services/authservice'
import type { User as FirebaseUser } from 'firebase/auth'

interface AuthContextType {
  user: FirebaseUser | null
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (firebaseUser) => {

        if (firebaseUser) {
          setUser(firebaseUser)
          setError(null)
        } else {
          setUser(null)
        }

        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  const value: AuthContextType = {
    user,
    loading,
    error,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { auth } from '@/lib/auth'
import type { Database } from '@/lib/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName?: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<any>
  updateProfile: (updates: Partial<Profile>) => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Get initial session
    auth.getCurrentUser().then(({ user }) => {
      console.log('Initial user check:', user?.id)
      setUser(user)
      if (user) {
        loadUserProfile(user.id)
      }
      setLoading(false)
    }).catch(error => {
      console.error('Error getting current user:', error)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user?.id)
      
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await loadUserProfile(session.user.id)
      } else {
        setProfile(null)
      }
      
      if (mounted) {
        setLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [mounted])

  const loadUserProfile = async (userId: string) => {
    try {
      console.log('Loading profile for user:', userId)
      const { data, error } = await auth.getUserProfile(userId)
      
      if (error) {
        console.error('Error loading profile:', error)
        // Create a fallback profile if none exists
        const fallbackProfile: Profile = {
          id: userId,
          email: user?.email || '',
          full_name: user?.user_metadata?.full_name || user?.email || 'User',
          avatar_url: null,
          role: 'student',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setProfile(fallbackProfile)
      } else if (data) {
        console.log('Profile loaded:', data)
        setProfile(data)
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error)
      // Create fallback profile on error
      const fallbackProfile: Profile = {
        id: userId,
        email: user?.email || '',
        full_name: user?.user_metadata?.full_name || user?.email || 'User',
        avatar_url: null,
        role: 'student',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setProfile(fallbackProfile)
    }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      console.log('Signing up user:', email)
      const result = await auth.signUp(email, password, fullName)
      console.log('Sign up result:', result)
      return result
    } catch (error) {
      console.error('Error in signUp:', error)
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in user:', email)
      const result = await auth.signIn(email, password)
      console.log('Sign in result:', result)
      return result
    } catch (error) {
      console.error('Error in signIn:', error)
      return { error }
    }
  }

  const signOut = async () => {
    try {
      console.log('Signing out user')
      
      // Clear state immediately
      setUser(null)
      setProfile(null)
      setSession(null)
      
      // Clear any cached data
      localStorage.removeItem('supabase.auth.token')
      
      const result = await auth.signOut()
      console.log('Sign out result:', result)
      
      // Force navigation to home page
      window.location.href = '/'
      
      return result
    } catch (error) {
      console.error('Error in signOut:', error)
      // Even if there's an error, clear the state and redirect
      setUser(null)
      setProfile(null)
      setSession(null)
      window.location.href = '/'
      return { error }
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') }
    
    try {
      const result = await auth.updateProfile(user.id, updates)
      if (result.data && !result.error) {
        setProfile(result.data)
      }
      return result
    } catch (error) {
      console.error('Error updating profile:', error)
      return { error }
    }
  }

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
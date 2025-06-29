import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export interface AuthUser extends User {
  profile?: {
    full_name: string | null
    avatar_url: string | null
    role: string | null
  }
}

export const auth = {
  // Sign up with email and password
  async signUp(email: string, password: string, fullName?: string) {
    try {
      console.log('Auth: Signing up user with email:', email)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      console.log('Auth: Sign up result:', { data: !!data, error: !!error })
      return { data, error }
    } catch (err) {
      console.error('Auth: Error in signUp:', err)
      return { data: null, error: err }
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      console.log('Auth: Signing in user with email:', email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      console.log('Auth: Sign in result:', { data: !!data, error: !!error })
      return { data, error }
    } catch (err) {
      console.error('Auth: Error in signIn:', err)
      return { data: null, error: err }
    }
  },

  // Sign out
  async signOut() {
    try {
      console.log('Auth: Signing out user')
      const { error } = await supabase.auth.signOut()
      console.log('Auth: Sign out result:', { error: !!error })
      return { error }
    } catch (err) {
      console.error('Auth: Error in signOut:', err)
      return { error: err }
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      console.log('Auth: Getting current user')
      const { data: { user }, error } = await supabase.auth.getUser()
      console.log('Auth: Current user result:', { user: !!user, error: !!error })
      return { user, error }
    } catch (err) {
      console.error('Auth: Error in getCurrentUser:', err)
      return { user: null, error: err }
    }
  },

  // Get user profile
  async getUserProfile(userId: string) {
    try {
      console.log('Auth: Getting user profile for:', userId)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      console.log('Auth: Profile result:', { data: !!data, error: !!error })
      return { data, error }
    } catch (err) {
      console.error('Auth: Error in getUserProfile:', err)
      return { data: null, error: err }
    }
  },

  // Update user profile
  async updateProfile(userId: string, updates: {
    full_name?: string
    avatar_url?: string
    role?: string
  }) {
    try {
      console.log('Auth: Updating profile for:', userId)
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
      
      console.log('Auth: Update profile result:', { data: !!data, error: !!error })
      return { data, error }
    } catch (err) {
      console.error('Auth: Error in updateProfile:', err)
      return { data: null, error: err }
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    console.log('Auth: Setting up auth state change listener')
    return supabase.auth.onAuthStateChange(callback)
  },
}
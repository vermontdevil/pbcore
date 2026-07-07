import { writable } from 'svelte/store'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta as any).env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = (import.meta as any).env.PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: 'PLAYER' | 'TOURNAMENT_DIRECTOR'
}

export const authUser = writable<AuthUser | null>(null)
export const isAuthenticated = writable(false)
export const authToken = writable<string | null>(null)

export async function logout() {
  authUser.set(null)
  isAuthenticated.set(false)
  authToken.set(null)
  await supabase.auth.signOut()
}

import { supabase } from './config';
import type { AuthError, User } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  const { data: { user }, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  return { user, error };
}

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  const { data: { user }, error } = await supabase.auth.signUp({
    email,
    password
  });

  return { user, error };
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
}
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private supabase: SupabaseClient;
  isLoggedIn: boolean = false;

  constructor() {
    const supabaseUrl = 'https://pvjzrvpwumzkmaydhesf.supabase.co';
    const supabaseKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2anpydnB3dW16a21heWRoZXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMzg2NzEsImV4cCI6MjA2MjYxNDY3MX0.rgqcYpxqZKuNn2ti2IOpcd0YvsFRZ5iIJgcq-j9cS8c';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async signUp(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const {
      data: { user },
      error,
    } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    return user;
  }

  async logIn(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    this.isLoggedIn = true;
    return data;
  }

  async getCurrentUser(): Promise<any> {
    const { data: user, error } = await this.supabase.auth.getUser();
    if (error || !user) {
      this.isLoggedIn = false;
      return null;
    }
    this.isLoggedIn = true;
    return user;
  }
}

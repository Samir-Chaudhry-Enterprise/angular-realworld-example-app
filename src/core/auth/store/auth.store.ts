import { create } from 'zustand';
import { User } from '../types';
import { AuthService } from '../services/auth.service';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (credentials: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  getCurrentUser: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const user = await AuthService.login(credentials);
      AuthService.saveToken(user.token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (credentials) => {
    set({ isLoading: true });
    try {
      const user = await AuthService.register(credentials);
      AuthService.saveToken(user.token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    AuthService.removeToken();
    set({ user: null, isAuthenticated: false });
  },

  getCurrentUser: async () => {
    const token = AuthService.getToken();
    if (!token) return;

    set({ isLoading: true });
    try {
      const user = await AuthService.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      AuthService.removeToken();
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  updateUser: async (userData) => {
    set({ isLoading: true });
    try {
      const user = await AuthService.updateUser(userData);
      set({ user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

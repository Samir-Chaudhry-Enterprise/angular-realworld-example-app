import { apiClient } from '../../api/client';
import { User, LoginCredentials, RegisterCredentials, AuthResponse } from '../types';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<User> {
    const response = await apiClient.post<AuthResponse>('/users/login', {
      user: credentials,
    });
    return response.data.user;
  }

  static async register(credentials: RegisterCredentials): Promise<User> {
    const response = await apiClient.post<AuthResponse>('/users', {
      user: credentials,
    });
    return response.data.user;
  }

  static async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<AuthResponse>('/user');
    return response.data.user;
  }

  static async updateUser(user: Partial<User>): Promise<User> {
    const response = await apiClient.put<AuthResponse>('/user', { user });
    return response.data.user;
  }

  static saveToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  static getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  static removeToken(): void {
    localStorage.removeItem('jwt');
  }
}

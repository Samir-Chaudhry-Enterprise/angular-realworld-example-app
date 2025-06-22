export interface User {
  id: number;
  email: string;
  username: string;
  bio?: string;
  image?: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
}

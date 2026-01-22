// User & Auth types
export type UserRole = "staff" | "manager";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  storeId: string;
  storeName: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Store types
export interface Store {
  id: string;
  name: string;
  address?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

import { create } from "zustand";
import { User } from "@/types";
import api from "@/api/axios";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  logout: () => void;
  fetchMe: () => Promise<void>;

  // Computed
  isManager: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  fetchMe: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get<User>("/me");
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      throw new Error("Unauthorized");
    }
  },

  isManager: () => {
    return get().user?.role === "manager";
  },
}));

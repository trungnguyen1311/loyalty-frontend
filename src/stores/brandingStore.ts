import { create } from "zustand";

interface BrandingConfig {
  logo: string;
  primaryColor: string;
  storeImage?: string;
  storeName?: string;
}

interface BrandingStore {
  config: BrandingConfig;
  isLoading: boolean;
  fetchBranding: () => Promise<void>;
}

export const useBrandingStore = create<BrandingStore>((set) => ({
  config: {
    logo: "https://treubar.com/logo.png", // Mock fallback
    primaryColor: "#6366f1",
    storeImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
    storeName: "Lepau Restaurant Kuching",
  },
  isLoading: false,
  fetchBranding: async () => {
    // In a real app, this would call GET /branding
    // For now, we use the mock state
    set({ isLoading: false });
  },
}));

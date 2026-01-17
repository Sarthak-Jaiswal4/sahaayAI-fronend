import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface FarmerInfo {
    id?: string;
    username: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    languagePreference?: string;
    hasDisability?: boolean;
    disabilityType?: string;
    answerPreference?: 'voice' | 'chat' | 'both';
    createdAt?: string;
    lastLoginAt?: string;
}

interface FarmerState {
    farmer: FarmerInfo | null;
    isAuthenticated: boolean;
    token: string | null;

    // Actions
    setFarmer: (farmer: FarmerInfo) => void;
    setToken: (token: string) => void;
    login: (farmer: FarmerInfo, token: string) => void;
    logout: () => void;
    updateFarmer: (updates: Partial<FarmerInfo>) => void;
}

export const useFarmerStore = create<FarmerState>()(
    persist(
        (set) => ({
            farmer: null,
            isAuthenticated: false,
            token: null,

            setFarmer: (farmer) =>
                set({
                    farmer,
                    isAuthenticated: true,
                }),

            setToken: (token) =>
                set({ token }),

            login: (farmer, token) =>
                set({
                    farmer: {
                        ...farmer,
                        lastLoginAt: new Date().toISOString(),
                    },
                    token,
                    isAuthenticated: true,
                }),

            logout: () =>
                set({
                    farmer: null,
                    token: null,
                    isAuthenticated: false,
                }),

            updateFarmer: (updates) =>
                set((state) => ({
                    farmer: state.farmer ? { ...state.farmer, ...updates } : null,
                })),
        }),
        {
            name: 'farmer-storage', // name of the item in localStorage
            storage: createJSONStorage(() => localStorage), // use localStorage for persistence
        }
    )
);

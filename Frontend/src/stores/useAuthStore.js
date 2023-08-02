import {create} from 'zustand';

export const useAuthStore = create(set => ({
  authenticated: false, // default value
  setAuthenticated: (value) => set(() => ({ authenticated: value })),
}));


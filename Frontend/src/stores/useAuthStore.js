import {create} from 'zustand';
import authService from '../services/authService';
import { toast } from "sonner";

export const useAuthStore = create(set => ({
  authenticated: false, // default value
  setAuthenticated: (value) => set(() => ({ authenticated: value })),
  user: null,
  setUser: (value) => set(() => ({ user: value })),
  token: null,
  setToken: (value) => set(() => ({ token: value })),
  logout: () => set(() => ({ authenticated: false, user: null, token: null })),
  register: (email, password) => {
    try {
      authService.register(email, password);
      toast.success("User registered successfully");
    }
    catch (error) {
      toast.error(error.message);
    }
  },
  login: (email, password) => {
    try {
      token = authService.login(email, password);
      setAuthenticated(true);
      setToken(token);
      toast.success("User logged in successfully");

    }
    catch (error) {
      toast.error(error.message);
    }
  }

}));


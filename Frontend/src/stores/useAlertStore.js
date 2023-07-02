import {create} from "zustand";

export const useAlertStore = create((set) => ({
    alert: null,
    error: false,
    loading: false,
    showSucces: (message) => set({ alert: message, error: false, loading: false }),
    showError: (message) => set({ alert: message, error: true, loading: false }),
    setLoading: () => set({ loading: true }),
    clearAlert: () => set({ alert: null, error: false, loading: false }),
  }));

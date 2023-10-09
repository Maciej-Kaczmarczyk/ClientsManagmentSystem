import {create} from "zustand";

export const useThemeStore = create((set, get) => ({
    theme: "light",
    toggleTheme: () => {
        set((state) => ({
        theme: state.theme === "light" ? "dark" : "light",
        }));
    },
    }));


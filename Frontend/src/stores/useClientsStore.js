import { create } from "zustand";
import dbService from "../services/dbService";
import { toast } from "sonner";

export const useClientsStore = create((set, get) => ({
    clients: [],
    isLoading: false,
    fetchClients: async () => {
        try {
            set({ isLoading: true });
            const clients = await dbService.getAllClients();
            set({ clients: clients });
        } catch (error) {
            toast.error("Error fetching clients");
        } finally {
            set({ isLoading: false });
        }
    },
    addClient: async (client) => {
        try {
            await dbService.addClient(client);
        } finally {
            get().fetchClients();
        }
    },
    deleteClient: async (id) => {
        try {
            await dbService.deleteClient(id);
        } finally {
            get().fetchClients();
        }
    },
}));

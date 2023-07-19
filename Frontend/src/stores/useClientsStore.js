import { create } from "zustand";
import dbService from "../services/dbService";
import { toast } from "sonner";

export const useClientsStore = create((set, get) => ({
    clients: [],
    isLoading: false,
    clientFormVisible: false,
    toggleClientForm: () => set((state) => ({ clientFormVisible: !state.clientFormVisible })),
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
    updateClient: async (id ,client) => {
        try {
            await dbService.updateClient(id ,client);
        } finally {
            get().fetchClients();
        }
    }
}));

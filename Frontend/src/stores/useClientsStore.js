import { create } from "zustand";
import clientsService from "../services/clientsService";
import { toast } from "sonner";

export const useClientsStore = create((set, get) => ({
  clients: [],
  isLoading: false,
  clientFormVisible: false,
  toggleClientForm: () => set((state) => ({ clientFormVisible: !state.clientFormVisible })),
  selectedClient: null,
  setSelectedClient: (client) => set({ selectedClient: client }),
  fetchClients: async () => {
    try {
      set({ isLoading: true });
      const clients = await clientsService.getAllClients();
      set({ clients: clients });
    } catch (error) {
      toast.error("Error fetching clients");
    } finally {
      set({ isLoading: false });
    }
  },
  addClient: async (client) => {
    try {
      await clientsService.addClient(client);
    } finally {
      get().fetchClients();
    }
  },
  deleteClient: async (id) => {
    try {
      await clientsService.deleteClient(id);
    } finally {
      get().fetchClients();
    }
  },
  updateClient: async (id, client) => {
    try {
      await clientsService.updateClient(id, client);
    } finally {
      get().fetchClients();
    }
  },
}));

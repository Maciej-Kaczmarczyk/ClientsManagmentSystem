import { create } from "zustand";
import clientsService from "../services/clientsService";
import { toast } from "sonner";
import authService from "../services/authService";
import { getCookie } from "typescript-cookie";

const accessToken = getCookie("accessToken");

export const useClientsStore = create((set, get) => ({
  clients: [], // all clients
  isLoading: false,
  clientFormVisible: false,
  toggleClientForm: () =>
    set((state) => ({ clientFormVisible: !state.clientFormVisible })), // toggle client form
  selectedClient: null, // selected client
  setSelectedClient: (client) => set({ selectedClient: client }), // set selected client
  fetchClients: async () => {
    if (!accessToken) {
      authService.refreshToken();
    }
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
      await authService.refreshToken();
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

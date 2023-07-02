import { create } from "zustand";
import dbService  from "../services/dbService";
import { useAlertStore } from "./useAlertStore";

const useSucces = (message) => {
    useAlertStore.setState({ alert: message });
}
const useError = (message) => {
    useAlertStore.setState({ alert: message, error: true });
}
const useLoading = () => {
    useAlertStore.setState({ loading: true });
}

export const useClientsStore = create((set, get) => ({
    clients: [],
    isLoading: false,
    fetchClients: async () => {
        try {
            set({ isLoading: true });
            const clients = await dbService.getAllClients();
            set({ clients: clients });
        }
        catch (error) {
            useError("Error fetching clients");
        }
        finally {
            set({ isLoading: false });
        }
    },
    addClient: async (client) => {
        useLoading();
        try {
            await dbService.addClient(client);
        }
        catch (error) {
            useError("Error adding client");
        }finally{
            useSucces("Client added succesfully");
            get().fetchClients();
        }
    },
    deleteClient: async (id) => {
        useLoading();
        try {
            await dbService.deleteClient(id);
            useSucces("Client deleted succesfully");
        }
        catch (error) {
            useError("Error deleting client");
        }finally{
            get().fetchClients();
        }
    }
}));

import axios from "axios";
import api from "../config/axiosConfig";
import authService from "./authService";

interface Client {
  firstname: string;
  lastname: string;
  address: string;
  zip_code: string;
  city: string;
  email: string;
  phone: string;
}

const clientsService = {
  getAllClients: async () => {
    await authService.refreshToken(); // Refresh token before request
    return api
      .get("/clients")
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  addClient: async (Client: Client) => {
    return api
      .post("/clients", Client)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  deleteClient: async (id: string) => {
    return api
      .delete(`/clients/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  updateClient: async (id: string, Client: Client) => {
    return axios
      .put(`/clients/${id}`, Client)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

export default clientsService;

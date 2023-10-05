import axios from "axios";
import api from "../config/axiosConfig";
import authService from "./authService";
import {Client} from "../types/types";

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

  addClient: async (client: Client) => {
    return api
      .post("/clients", client)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  deleteClient: async (id: number) => {
    return api
      .delete(`/clients/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  updateClient: async (id: number, client: Client) => {
    console.log(client, id);
    return api
      .put(`/clients/${id}`, client)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

export default clientsService;

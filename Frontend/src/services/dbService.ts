import axios from "axios";

interface Client {
  firstname: string;
  lastname: string;
  address: string;
  zip_code: string;
  city: string;
  email: string;
  phone: string;
}

const api = axios.create({
  baseURL: 'https://clientsmanagmentsystem.onrender.com/',
  headers: {
    'Authorization': `${localStorage.getItem('token')}`
  }
});

const dbService = {
  getAllClients: async () => {
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
    return api
      .put(`/clients/${id}`, Client)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

export default dbService;

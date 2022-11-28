import axios from "axios";

interface Client {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
}

const dbService = {
  getAllClients: async () => {
    return axios
      .get("http://localhost:8000/clients")
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  addClient: async (Client: Client) => {
    return axios
      .post("http://localhost:8000/clients", Client)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  deleteClient: async (id: string) => {
    return axios
      .delete(`http://localhost:8000/clients/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

export default dbService;

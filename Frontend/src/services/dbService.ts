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

const dbService = {
  
  getAllClients: async () => {
    return axios
      .get("https://clientsmanagmentsystem.onrender.com/clients")
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  addClient: async (Client: Client) => {
    return axios
      .post("https://clientsmanagmentsystem.onrender.com/clients", Client)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  deleteClient: async (id: string) => {
    return axios
      .delete(`https://clientsmanagmentsystem.onrender.com/clients/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

export default dbService;

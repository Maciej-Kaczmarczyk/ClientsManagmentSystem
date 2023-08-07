import axios from "axios";

interface authData {
  email: string;
  password: string;
}

const authService = {
  login: async (data: authData) => {
    return await axios.post("https://clientsmanagmentsystem.onrender.com/login", data);
  },
  register: async (data: authData) => {
    return await axios.post("https://clientsmanagmentsystem.onrender.com/register", data);
  }
};

export default authService;

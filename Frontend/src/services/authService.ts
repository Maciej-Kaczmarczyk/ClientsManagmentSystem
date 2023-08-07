import axios from "axios";

interface authData {
  email: string;
  password: string;
}

const authService = {
  login: async (data: authData) => {
    return await axios.post("localhost:8000/login", data);
  },
  register: async (data: authData) => {
    return await axios.post("localhost:8000/register", data);
  }
};

export default authService;

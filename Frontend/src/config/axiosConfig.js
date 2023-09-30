import axios from "axios";

const api = axios.create({
  baseURL: "https://https://clientsmanagmentsystem.onrender.com//",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

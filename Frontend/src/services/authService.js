import axios from "axios";
import { toast } from "sonner";
import { removeCookie, setCookie } from "typescript-cookie";

const authService = {
  login: (email, password) => {
    toast("Logging in...", { type: "info" });
    axios
      .post("https://clientsmanagmentsystem.onrender.com/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.token) {
          setCookie("token", `${res.data.token}`, { expires: 1 / 48 });
          axios.defaults.headers.common["Authorization"] = `${res.data.token}`;
          window.location.href = "/clients";
          console.log(res);
          toast("Logged in successfully", { type: "success" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data, { type: "error" });
      });
  },
  register: (email, password) => {
    toast("Trying to register...", { type: "info" });
    axios
      .post("https://clientsmanagmentsystem.onrender.com/register", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.token) {
          setCookie("token", `${res.data.token}`, { expires: 1 });
          axios.defaults.headers.common["Authorization"] = `${res.data.token}`;
          window.location.href = "/clients";
        } else {
          toast.error("Register Failed");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data, { type: "error" });
      });
  },
  logout: () => {
    removeCookie("token");
    window.location.href = "/login";
  },
};

export default authService;

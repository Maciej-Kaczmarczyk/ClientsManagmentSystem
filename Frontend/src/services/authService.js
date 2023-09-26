import axios from "axios";
import { toast } from "sonner";
import { removeCookie, setCookie, getCookie } from "typescript-cookie";

const apiPath = "http://localhost:8000";

const authService = {
  login: (email, password) => {
    toast("Logging in...", { type: "info" });
    axios
      .post(apiPath + "/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.accessToken && res.data.refreshToken) {
          setCookie("accessToken", `${res.data.accessToken}`, { expires: 1 / 96 });
          setCookie("refreshToken", `${res.data.refreshToken}`, { expires: 1 });
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
      .post(apiPath + "/register", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.accessToken) {
          setCookie("token", `${res.data.token}`, { expires: 1 });
          axios.defaults.headers.common["Authorization"] = `${res.data.accessToken}`;
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
    removeCookie("accessToken");
    removeCookie("refreshToken");
    window.location.href = "/login";
  },
  refreshToken: () => {
    axios
      .post(apiPath + "/refresh-token", {
        refreshToken: getCookie("refreshToken"),
      })
      .then((res) => {
        if (res.data.accessToken) {
          setCookie("accessToken", `${res.data.accessToken}`, { expires: 1 / 96 });
          axios.defaults.headers.common["Authorization"] = `${res.data.accessToken}`;
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data, { type: "error" });
        window.location.href = "/login"; // Redirect to login if refresh fails
      });
  },
};

export default authService;

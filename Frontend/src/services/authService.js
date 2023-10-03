import api from "../config/axiosConfig";
import { toast } from "sonner";
import { removeCookie, setCookie, getCookie } from "typescript-cookie";

const authService = {
  login: async (email, password) => {
    const loginLoadingToast = toast("Logging in...", { type: "info", duration: 20000, });
    api
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.accessToken && res.data.refreshToken) {
          setCookie("accessToken", `${res.data.accessToken}`, {
            expires: 1 / 96,
          }); // Set accessToken cookie for 15 min
          setCookie("refreshToken", `${res.data.refreshToken}`, { expires: 1 }); // Set refreshToken cookie for 1 day
          api.defaults.headers.common["Authorization"] = `${res.data.token}`; // Set axios headers
          window.location.href = "/clients";
          toast.dismiss(loginLoadingToast);
          toast("Logged in successfully", { type: "success" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(loginLoadingToast);
        toast(err.response.data, { type: "error" });
      });
  },

  register: async (email, password) => {
    const registerLoadingToast = toast("Logging in...", { type: "info", duration: 20000, });
    api
      .post("/register", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.accessToken) {
          setCookie("token", `${res.data.token}`, { expires: 1 }); // Set accessToken cookie for 1 day
          api.defaults.headers.common[
            "Authorization"
          ] = `${res.data.accessToken}`;
          window.location.href = "/clients";
        } else {
          toast.dismiss(registerLoadingToast);
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
  // Refresh accessToken
  refreshToken: async () => {
    const newAccessToken = await api
      .post("/refresh-token", {
        refreshToken: getCookie("refreshToken"),
      })
      .then((res) => {
        return res.data.accessToken;
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data, { type: "error" });
        window.location.href = "/login"; // Redirect to login if refresh fails
      });
    // Set new accessToken for 15 min and update axios headers
    setCookie("accessToken", newAccessToken, { expires: 1 / 96 }); // Set accessToken cookie for 15 min
    api.defaults.headers.common["Authorization"] = newAccessToken; // Set axios headers
  },
};

export default authService;

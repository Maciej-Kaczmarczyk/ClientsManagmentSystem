import api from "../config/axiosConfig";
import { toast } from "sonner";
import { removeCookie, setCookie, getCookie } from "typescript-cookie";
import { Credentials } from "../types/types";


const authService = {
  login: async (credentials: Credentials) => {
    const loginLoadingToast = toast("Logging in...", { duration: 20000 });
    console.log(credentials);
    api
      .post("/login", credentials)
      .then((res) => {
        if (res.data.accessToken && res.data.refreshToken) {
          setCookie("accessToken", `${res.data.accessToken}`, {
            expires: 1 / 96,
          }); // Set accessToken cookie for 15 min
          setCookie("refreshToken", `${res.data.refreshToken}`, { expires: 1 }); // Set refreshToken cookie for 1 day
          api.defaults.headers.common["Authorization"] = `${res.data.token}`; // Set axios headers
          window.location.href = "/clients";
          toast.dismiss(loginLoadingToast);
          toast.success("Logged in successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(loginLoadingToast);
        toast.error(err.response.data);
      });
  },

  register: async (credentials: Credentials) => {
    const registerLoadingToast = toast("Logging in...", {
      duration: 20000,
    });
    api
      .post("/register", credentials)
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
        toast.error(err.response.data);
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
        toast.error(err.response.data);
        window.location.href = "/login"; // Redirect to login if refresh fails
      });
    // Set new accessToken for 15 min and update axios headers
    setCookie("accessToken", newAccessToken, { expires: 1 / 96 }); // Set accessToken cookie for 15 min
    api.defaults.headers.common["Authorization"] = newAccessToken; // Set axios headers
  },
};

export default authService;

import React, { useState } from "react";
import Button from "../components/Button";
import { useAuthStore } from "../stores/useAuthStore";
import axios from "axios";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import { getCookie, setCookie } from "typescript-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://clientsmanagmentsystem.onrender.com/login", {
        email: email,
        password: password,
      });
      if (res.data.token) {
        toast.success("Login Successful");
        setCookie("token", `${res.data.token}`, { expires: 1 });
        axios.defaults.headers.common["Authorization"] = `${res.data.token}`;
        toast.success("Login Successful");
        window.location.href = "/clients";
      } else {
        toast.error("Login Failed");
      }
    } catch (err) {
      console.error(err);
      return toast.error(err.response.data);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center rounded-lg border-[1px] pb-1 bg-white w-full max-w-[500px] h-fit max-h-[700px] shadow-xl">
        <div className="flex justify-center items-center gap-8 p-8 w-full py-20">
          <div className="w-full h-full flex flex-col gap-8">
            <h1 className=" text-xl font-bold text-gray-500">Login to your account</h1>
            <div className="flex flex-col gap-6">
              <input
                type="email"
                name="Email"
                className={`w-full h-14 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200 `}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="Password"
                className={`w-full h-14 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200 `}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className=" text-slate-400 pl-5">forgot password?</p>
            </div>
            <Button method={handleLogin} style={"bg-accent2 w-[100%] hover:brightness-90"} text="Login" />
            <p className=" text-slate-400 text-center">
              Don't hava an account? <span className=" font-bold">Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

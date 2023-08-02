import React, { useState } from "react";
import Button from "../components/Button";
import { useAuthStore } from "../stores/useAuthStore";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const handleLogin = () => {
    if (email === "" || password === "") {
        setAuthenticated(true);
        <Navigate to="/dashboard" />;
    }else
    {
        console.log("Login Failed");
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

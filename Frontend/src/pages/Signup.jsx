import React, { useState } from "react";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { getCookie, setCookie } from "typescript-cookie";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
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
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center rounded-lg border-[1px] pb-1 bg-white w-full max-w-[500px] h-fit max-h-[700px] shadow-xl">
        <div className="flex justify-center items-center gap-8 p-8 w-full py-20">
          <div className="w-full h-full flex flex-col gap-8">
            <h1 className=" text-xl font-bold text-gray-500">Create your account</h1>
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
            </div>
            <Button
              method={() => {
                handleSignup();
              }}
              style={"bg-accent2 w-[100%] hover:brightness-90"}
              text="Sign up"
            />
            <p className=" text-slate-400 text-center">
              Already have an account?{" "}
              <NavLink to="/login">
                <span className="font-bold hover:text-accent2">Login</span>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

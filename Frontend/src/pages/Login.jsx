import { useState } from "react";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center rounded-lg border-[1px] pb-1 bg-uiPrimary w-full max-w-[500px] h-fit max-h-[700px] shadow-xl">
        <div className="flex justify-center items-center gap-8 p-8 w-full py-20">
          <div className="w-full h-full flex flex-col gap-8">
            <h1 className=" text-xl font-bold text-textSecondary">Login to your account</h1>
            <div className="flex flex-col gap-6">
              <input type="email" name="Email" className={`w-full h-14 rounded-lg border-2 focus:outline-none focus:border-uiAccent px-4 font-base text-textPrimary duration-200 `} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <input type="password" name="Password" className={`w-full h-14 rounded-lg border-2 focus:outline-none focus:border-uiAccent px-4 font-base text-textPrimary duration-200 `} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              <p className=" text-textTertiary pl-5">forgot password?</p>
            </div>
            <Button
              method={() => {
                authService.login(email, password);
              }}
              style={"bg-uiAccent w-[100%] hover:brightness-90"}
              text="Login"
            />
            <p className=" text-textTertiary text-center">
              Don't hava an account?{" "}
              <NavLink to="/signup">
                <span className="font-bold hover:text-uiAccent">Sign up</span>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

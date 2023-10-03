import { useState } from "react";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import authService from "../services/authService";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password !== password_confirmation) {
      alert("Passwords do not match");
      return;
    }
    authService.login(email, password);
  };

  return (
    <div className="flex items-center justify-center overflow-hidden lg:h-full lg:w-full">
      <div className="flex h-fit max-h-[700px] w-full max-w-[500px] flex-col items-center justify-center rounded-lg bg-uiPrimary pb-1 lg:border-[1px] lg:shadow-xl">
        <div className="flex w-full items-center justify-center gap-8 p-8 py-20">
          <div className="flex h-full w-full flex-col gap-8">
            <h1 className=" text-xl font-bold text-textSecondary">
              Create your account
            </h1>
            <form className="flex flex-col gap-6">
              <input
                type="email"
                name="email"
                className={`font-base h-14 w-full rounded-lg border-2 px-4 text-textPrimary duration-200 focus:border-uiAccent focus:outline-none `}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                autoComplete="on"
                className={`font-base h-14 w-full rounded-lg border-2 px-4 text-textPrimary duration-200 focus:border-uiAccent focus:outline-none `}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                name="password_confirmation"
                autoComplete="on"
                className={`font-base h-14 w-full rounded-lg border-2 px-4 text-textPrimary duration-200 focus:border-uiAccent focus:outline-none `}
                placeholder="Confirm Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                method={() => {
                  authService.login(email, password);
                }}
                style="bg-uiAccent w-[100%] hover:brightness-90"
                text="Sign In"
                type="submit"
              />
            </form>
            <p className=" text-center text-slate-400">
              Already have an account?{" "}
              <NavLink to="/login">
                <span className="font-bold hover:text-textAccent">Login</span>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

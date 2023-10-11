import { useState } from "react";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import authService from "../services/authService";
import Container from "../components/Container";
import Layout from "../components/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex h-full w-full justify-center lg:items-center">
      <div className="flex w-full flex-col rounded-lg border-[1px] bg-white px-4 py-12 shadow-lg lg:h-fit lg:max-w-md">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900">
          Sign in to your account
        </h2>

        <div className="mx-auto mt-10 w-full max-w-sm sm:w-full">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-zinc-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md py-1.5 pl-2 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-zinc-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <p className="font-semibold text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md py-1.5 pl-2 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                method={() => {
                  authService.login({ email, password });
                }}
                style="bg-blue-600 w-[100%] hover:bg-blue-500"
                text="Sign in"
                type="submit"
              />
            </div>
          </form>

          <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-zinc-500">
            Not a member?{" "}
            <NavLink to="/signup">
              <p className=" font-semibold leading-6 text-blue-600 hover:text-blue-500">
                Join now &rarr;
              </p>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

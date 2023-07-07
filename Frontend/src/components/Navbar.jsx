import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex w-full justify-center border-b-[1px]">
      <div className="flex w-full justify-between items-center max-w-screen-xl py-4">
        <ul className="flex gap-20 text-[#1F1F1F] text-base">
          <Link className="cursor-pointer" to="/">
            Dashboard
          </Link>
          <Link className="cursor-pointer" to="clients">
            Clients
          </Link>
          <li className="cursor-pointer">Orders</li>
          <li className="cursor-pointer">Stats</li>
        </ul>

        <div className="flex items-center gap-4">
          <p>Welcome, Maciej</p>
          <div className="w-8 aspect-square bg-red-400 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


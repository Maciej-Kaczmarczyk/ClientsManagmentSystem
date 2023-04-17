import React from "react";

const Navbar = () => {
  return (
    <nav className="flex w-full justify-center border-b-2">
      <div className="flex w-full justify-between max-w-screen-xl py-4">
        <p className="text-md font-semibold border-b-2 border-black">Dashboard</p>
        <div className="w-8 aspect-square bg-red-400 rounded-full"></div>
      </div>
    </nav>
  );
};

export default Navbar;

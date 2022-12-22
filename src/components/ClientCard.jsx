import React, { useState } from "react";
import dbService from "../services/dbService";
import Button from "./Button";
import deleteClient from "../func/deleteClient";

const dotsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-navDark"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
    />
  </svg>
);

const ClientCard = (props) => {
  const client = props.client;
  const fetchClients = props.fetchClients;

  const [optionWindow, setOptionWindow] = useState(false);
  const toggleOptionWindow = () => {
    setOptionWindow(!optionWindow);
  };

  return (
    <li className="flex justify-between items-center gap-4 px-8 py-6 border-t-[1px] bg-bgLight hover:cursor-pointer hover:bg-bgDark">
      <div className="flex items-center justify-center gap-32">
        <div className="flex flex-col w-60">
          <h3 className="font-semibold text-md">
            {client.firstname} {client.lastname}
          </h3>
          <p className="text-md w-fit text-gray-500 font-normal">
            Last order: no orders yet
          </p>
        </div>

        <div className="flex flex-col w-60">
          <p className="text-md font-semibold text-md">{client.phone} </p>
          <a
            href={"mailto: " + client.email}
            className="text-md text-accent2 underline font-normal"
          >
            {client.email}
          </a>
        </div>

        <div className="flex flex-col w-60">
          <p className="font-semibold text-md">
            {client.city}, {client.zip_code}
          </p>
          <p className="text-md w-fit text-gray-500 font-normal">
            {client.address}
          </p>
        </div>
      </div>

      <div className="relative">
        <Button
          method={async () => toggleOptionWindow()}
          style={"bg-opacity-0 hover:bg-opacity-0"}
          icon={dotsIcon}
        />
        {optionWindow ? (
          <div className="absolute w-fit h-fit border-[1px] py-4 bg-white rounded-lg top-1/2 bottom-1/2 right-10">
            
              <li className=" hover:cursor-pointer mx-4 w-fit hover:bg-bgDark">Edit</li>
              <li className=" hover:cursor-pointer mx-4 w-fit hover:bg-bgDark">Delete</li>
              
           
          </div>
        ) : null}
      </div>
    </li>
  );
};

export default ClientCard;

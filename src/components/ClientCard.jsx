import React from "react";
import dbService from "../services/dbService";
import Button from "./Button";
import deleteClient from "../func/deleteClient";

const addClientIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
  </svg>
);

const xIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ClientCard = (props) => {
  const client = props.client;
  const fetchClients = props.fetchClients;

  return (
    <div className="flex justify-between gap-4 items-center px-4 py-6 border-l-8 border-accent2 bg-bgLight rounded-lg">
      <div className="flex items-center gap-10">
        <h3 className="w-60 font-semibold text-xl">
          {client.firstname} {client.lastname}
        </h3>

        <div className="flex w-fit gap-16">
          <p className="text-md text-gray-500 font-normal">{client.phone} </p>
          <p className="text-md w-24 text-gray-500 font-normal">
            {client.address}
          </p>
          <a
            href={"mailto: " + client.email}
            className="text-md text-accent2 underline font-normal"
          >
            {client.email}
          </a>
        </div>
      </div>

      <Button
        method={async () =>
          deleteClient(client._id).then(() => {
            fetchClients();
          })
        }
        style={"bg-red-400"}
        icon={xIcon}
      />
    </div>
  );
};

export default ClientCard;

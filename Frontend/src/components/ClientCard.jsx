import React, { useEffect, useRef, useState } from "react";
import { useClientsStore } from "../stores/useClientsStore";
import Button from "../components/Button";
import { toast } from "sonner";
import DotsIcon from "../assets/icons/dotsIcon.svg";

const ClientCard = (props) => {
  const client = props.client;
  const deleteClient = useClientsStore((state) => state.deleteClient);
  const toggleClientForm = useClientsStore((state) => state.toggleClientForm);
  const setSelectedClient = useClientsStore((state) => state.setSelectedClient);

  const handleDelete = async () => {
    toggleOptionWindow();
    toast.promise(deleteClient(client.id), {
      loading: "Deleting client...",
      success: "Client deleted",
      error: "Error deleting client",
    });
  };

  const handleEdit = () => {
    toggleOptionWindow();
    toggleClientForm();
    setSelectedClient(client);
  };

  const [optionWindow, setOptionWindow] = useState(false);
  const toggleOptionWindow = () => {
    setOptionWindow(!optionWindow);
  };

  const popupRef = useRef();

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setOptionWindow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li className="row-start-2 flex items-center justify-between gap-4 border-t-[1px] bg-white px-8 py-6 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">
      <div className=" flex flex-wrap items-center gap-32 gap-y-8 text-sm lg:text-base xl:justify-center">
        <div className="flex w-60 flex-col">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-300">
            {client.firstname} {client.lastname}
          </h3>
          <p className=" w-fit font-normal text-textSecondary dark:text-zinc-400">
            Last order: no orders yet
          </p>
        </div>

        <div className="flex w-60 flex-col">
          <p className="font-semibold text-zinc-900 dark:text-zinc-300">
            {client.phone}{" "}
          </p>
          <a
            href={"mailto: " + client.email}
            className="font-normal text-blue-600 underline"
          >
            {client.email}
          </a>
        </div>

        <div className="flex w-60 flex-col">
          <p className="font-semibold text-zinc-900 dark:text-zinc-300">
            {client.address}
          </p>
          <p className="w-fit font-normal text-textSecondary dark:text-zinc-400">
            {" "}
            {client.zip_code} {client.city}
          </p>
        </div>
      </div>

      <div className="relative">
        <DotsIcon
          onClick={toggleOptionWindow}
          strokeWidth="1.5"
          className="text-zinc-900 dark:text-white h-6 w-6 cursor-pointer rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-600"
        />
        {optionWindow ? (
          <div ref={popupRef}>
            <div className="absolute -top-1/2 bottom-0 right-10 h-fit w-fit rounded-lg border-[1px] bg-white py-4 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
              <ul>
                <li
                  onClick={handleDelete}
                  className="w-full px-4 hover:cursor-pointer hover:bg-uiSecondary dark:text-zinc-50"
                >
                  Delete
                </li>
                <li
                  onClick={handleEdit}
                  className="w-full px-4 hover:cursor-pointer hover:bg-uiSecondary dark:text-zinc-50"
                >
                  Edit
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </li>
  );
};

export default ClientCard;

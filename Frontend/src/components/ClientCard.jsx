import React, { useEffect, useRef, useState } from "react";
import { useClientsStore } from "../stores/useClientsStore";
import Button from "../components/Button";
import { toast } from "sonner";

const dotsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-navDark">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
  </svg>
);

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
    <li className="flex justify-between items-center gap-4 px-8 py-6 border-t-[1px] bg-bgLight hover:bg-bgDark">
      <div className="flex flex-wrap items-center xl:justify-center gap-y-8 gap-32">
        <div className="flex flex-col w-60">
          <h3 className="font-semibold text-md">
            {client.firstname} {client.lastname}
          </h3>
          <p className="text-md w-fit text-gray-500 font-normal">Last order: no orders yet</p>
        </div>

        <div className="flex flex-col w-60">
          <p className="text-md font-semibold text-md">{client.phone} </p>
          <a href={"mailto: " + client.email} className="text-md text-accent2 underline font-normal">
            {client.email}
          </a>
        </div>

        <div className="flex flex-col w-60">
          <p className="font-semibold text-md">
            {client.address}
          </p>
          <p className="text-md w-fit text-gray-500 font-normal"> {client.zip_code} {client.city}</p>
        </div>
      </div>

      <div className="relative">
        <Button method={async () => toggleOptionWindow()} style={"bg-opacity-0 hover:bg-opacity-0"} icon={dotsIcon} />
        {optionWindow ? (
          <div ref={popupRef}>
            <div className="absolute w-fit h-fit border-[1px] py-4 bg-white rounded-lg -top-1/2 bottom-0 right-10 shadow-lg">
              <ul>
                <li onClick={handleDelete} className=" hover:cursor-pointer px-4 w-full hover:bg-bgDark">
                  Delete
                </li>
                <li onClick={handleEdit} className=" hover:cursor-pointer px-4 w-full hover:bg-bgDark">
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

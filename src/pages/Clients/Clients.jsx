import React, { useEffect, useRef, useState } from "react";
import ClientCard from "../../components/ClientCard";
import AddClientForm from "../../components/AddClientForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import dbService from "../../services/dbService";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import addClient from "../../func/addClient";

const Clients = () => {
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

  const testClient = {
    firstname: "Test",
    lastname: "Test",
    phone: "600111444",
    address: "Test",
    zip_code: "Test",
    city: "Test",
    email: "test@gmail.com",
  };

  const [parent] = useAutoAnimate(/* optional config */);

  const [addForm, setAddForm] = useState(false);
  const toggleAddForm = () => {
    setAddForm(!addForm);
  };

  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    const data = await dbService.getAllClients();
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <>
      <div ref={parent} className=" overflow-y-scroll w-full h-full bg-bgDark">
        <div ref={parent} className="flex flex-col h-32">
          <div className="flex h-1/2 bg-accent2 items-center px-8">
            <h2 className="text-white font-semibold text-3xl">Clients</h2>
          </div>
          <div className="flex justify-start items-center px-8 gap-8 w-full h-1/2 bg-bgLight">
            <div className="flex w-1/2">
              <input
                className="w-full h-10 rounded-l-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-gray-400 duration-200"
                type="search"
                placeholder="Search"
              />
              <button onClick={() => {console.log(clients)}} className="flex justify-center items-center rounded-r-lg bg-accent2 h-10 w-12 hover:brightness-90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <button
              className="flex gap-2 justify-center text-white items-center rounded-lg bg-accent1 h-10 w-fit px-4 font-semibold hover:brightness-90"
              onClick={toggleAddForm}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
              </svg>
              Add Client
            </button>
          </div>
        </div>

        <div ref={parent} className="flex flex-col gap-4 p-8">
          {addForm ? (
            <AddClientForm
              toggleAddForm={toggleAddForm}
              fetchClients={fetchClients}
            />
          ) : null}

          {clients?.map((client) => (
            <ClientCard
              key={client._id}
              client={client}
              fetchClients={fetchClients}
            />
          )) ?? (
            <div className="flex flex-col justify-start w-full gap-4 animate-pulse">
              <div className="flex justify-between w-full gap-4 items-center px-4 py-8 border-l-8 bg-bgLight rounded-lg"></div>
              <div className="flex justify-between w-full gap-4 items-center px-4 py-8 border-l-8 bg-bgLight rounded-lg"></div>
              <div className="flex justify-between w-full gap-4 items-center px-4 py-8 border-l-8 bg-bgLight rounded-lg"></div>
              <div className="flex justify-between w-full gap-4 items-center px-4 py-8 border-l-8 bg-bgLight rounded-lg"></div>
              <div className="flex justify-between w-full gap-4 items-center px-4 py-8 border-l-8 bg-bgLight rounded-lg"></div>
              <div className="flex justify-between w-full gap-4 items-center px-4 py-8 border-l-8 bg-bgLight rounded-lg"></div>
              <div className="flex justify-between w-full gap-4 items-center px-4 py-8 border-l-8 bg-bgLight rounded-lg"></div>
       
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Clients;

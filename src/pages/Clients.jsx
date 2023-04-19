import React, { useEffect, useRef, useState } from "react";
import ClientCard from "../components/ClientCard";
import AddClientForm from "../components/AddClientForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import dbService from "../services/dbService";
import Loading from "../components/Loading";
import Button from "../components/Button";
import addClient from "../func/addClient";

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

  const [parent] = useAutoAnimate(/* optional config */);

  const [addForm, setAddForm] = useState(false);
  const toggleAddForm = () => {
    setAddForm(!addForm);
  };

  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    const data = await dbService.getAllClients();
    setClients(data);
    console.log(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const [searchString, setSearchString] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    if (searchString === "") {
      setFilteredClients(clients);
      return;
    }

    const results = clients.filter((client) => {
      if (
        client.firstname.toLowerCase().includes(searchString.toLowerCase()) ||
        client.lastname.toLowerCase().includes(searchString.toLowerCase()) ||
        client.email.toLowerCase().includes(searchString.toLowerCase()) ||
        client.phone.includes(searchString) ||
        client.address.toLowerCase().includes(searchString.toLowerCase()) ||
        client.city.toLowerCase().includes(searchString.toLowerCase()) ||
        client.zip_code.toLowerCase().includes(searchString.toLowerCase())
      ) {
        return client;
      }
    });
    setFilteredClients(results);
  }, [clients, searchString]);

  return (
    <>
      <div
        ref={parent}
        className="flex flex-col items-center p-8 gap-8 w-full h-full bg-bgDark overflow-scroll"
      >
        <div
          ref={parent}
          className="flex flex-col rounded-lg border-[1px] bg-white w-full max-w-screen-xl"
        >
          <div className="flex justify-start items-center gap-8 p-8 w-full h-1/2">
            <div className="flex gap-4 w-full">
              <div className="flex w-1/2">
                <input
                  className="w-full h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-gray-400 duration-200"
                  type="search"
                  placeholder="Search"
                  onChange={(e) => {
                    setSearchString(e.target.value);
                  }}
                />
              </div>

              <Button
                icon={addClientIcon}
                text="Add Client"
                method={async () => toggleAddForm()}
                style="bg-accent2 hover:brightness-90"
              />
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-navNormal cursor-pointer"
                onClick={fetchClients}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
          </div>

          {addForm ? (
            <AddClientForm
              toggleAddForm={toggleAddForm}
              fetchClients={fetchClients}
            />
          ) : null}

          <ul className="flex justify-between items-center gap-4 px-8 py-2 bg-bgLight ">
            <div className="flex items-center justify-center gap-22 text-sm">
              <div className="flex flex-col w-60">
                <p className="w-fit text-gray-500 font-normal">Name</p>
              </div>

              <div className="flex flex-col w-60">
                <p className="w-fit text-gray-500 font-normal">Contact</p>
              </div>

              <div className="flex flex-col w-60">
                <p className="w-fit text-gray-500 font-md">Address</p>
              </div>
            </div>
          </ul>

          <ul className="h-fit">
            {filteredClients?.map((client) => (
              <ClientCard
                key={client.email}
                client={client}
                fetchClients={fetchClients}
              />
            )) ?? (
              <div className="flex justify-center w-full gap-4 items-center px-8 py-8 bg-bgLight rounded-lg">
                There is no data
              </div>
            )}
          </ul>

          <div className="flex justify-start items-center border-t-[1px] gap-8 p-8 w-full h-1/2">
            <div className="flex w-1/2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;

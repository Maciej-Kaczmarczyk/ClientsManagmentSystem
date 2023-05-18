import React, { useState } from "react";
import dbService from "../services/dbService";
import Loading from "./Loading";
import Clients from "../pages/Clients";
import Button from "./Button";
import addClient from "../func/addClient";

const AddClientForm = ({ toggleAddForm, fetchClients, addClient }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const Client = {
    firstname: firstname,
    lastname: lastname,
    address: address,
    zip_code: zip_code,
    city: city,
    phone: phone,
    email: email,
  };

  return (
    <div className="z-10 flex justify-center absolute shadow-xl bg-black bg-opacity-50 w-full h-full py-[10vw] px-[20vw]">
      <div className="absolute max-w-screen-md h-[500px] flex flex-col justify-between flex-wrap px-8 bg-bgLight py-8 rounded-lg duration-200">
        <div className="flex justify-between w-full">
          <h3 className="text-3xl font-semibold text-navNormal">Add Client</h3>
          <svg
            onClick={toggleAddForm}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:cursor-pointer hover:bg-gray-200 rounded-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex flex-wrap justify-between w-full gap-8">
          <div className="flex w-full justify-between gap-4">
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              name="firstname"
              id="firstname"
              className="w-1/2 h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200"
              placeholder="First Name"
            />

            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              name="firstname"
              id="firstname"
              className="w-1/2 h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200"
              placeholder="Last Name"
            />
          </div>

          <div className="flex w-full gap-4">
            <input
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type="text"
              name="firstname"
              id="firstname"
              className="w-2/3 h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200"
              placeholder="Address"
            />
            <div className="flex justify-between gap-4 w-1/2">
              <input
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                type="text"
                name="firstname"
                id="firstname"
                className="h-10 w-2/3 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200"
                placeholder="City"
              />
              <input
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
                type="text"
                name="firstname"
                id="firstname"
                className="w-1/2 h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200"
                placeholder="Zip Code"
              />
            </div>
          </div>

          <div className="flex w-full justify-between gap-4">
            <input
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              type="text"
              name="firstname"
              id="firstname"
              className="w-1/2 h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200"
              placeholder="Phone Number"
            />

            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              name="firstname"
              id="firstname"
              className="w-1/2 h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200"
              placeholder="Email"
            />
          </div>
        </div>
        <Button
          method={async () => {
            addClient(Client).then(() => {
              fetchClients();
              toggleAddForm();
            });
          }}
          style={"bg-accent2 w-[100%] hover:brightness-90"}
          text={"Add Client"}
        />
      </div>
    </div>
  );
};

export default AddClientForm;

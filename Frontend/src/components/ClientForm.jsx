import { useState, useEffect } from "react";
import dbService from "../services/dbService";
import Loading from "./Loading";
import Button from "./Button";

const ClientForm = ({ toggleForm, fetchClients, clientData }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");

  const validate = () => {
    setFirstNameError("");
    setLastNameError("");
    setZipCodeError("");
    setCityError("");
    setPhoneError("");
    setEmailError("");
    setAddressError("");

    let isValid = true;
    const emailPattern = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/;
    const phonePattern = /^\+?\d{1,4}?[-. ]?\(?(?:\d{1,3}?\)?[-. ]?)?(?:\d{1,4}[-. ]?){1,3}\d{1,9}$/;
    const zipCodePattern = /^\d{2}-\d{3}$/;

    if (firstname.trim().length < 2) {
      setFirstNameError("First name must be at least 2 characters long");
      isValid = false;
    }
    if (lastname.trim().length < 2) {
      setLastNameError("Last name must be at least 2 characters long");
      isValid = false;
    }
    if (!zipCodePattern.test(zip_code)) {
      setZipCodeError("Invalid zip code");
      isValid = false;
    }
    if (city.trim().length < 2) {
      setCityError("City must be at least 2 characters long");
      isValid = false;
    }
    if (!phonePattern.test(phone)) {
      setPhoneError("");
      isValid = false;
    }
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    }
    if (address.trim().length < 2) {
      setAddressError("Address must be at least 2 characters long");
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    if (clientData) {
      setFirstName(clientData.firstname || "");
      setLastName(clientData.lastname || "");
      setZipCode(clientData.zip_code || "");
      setCity(clientData.city || "");
      setPhone(clientData.phone || "");
      setEmail(clientData.email || "");
      setAddress(clientData.address || "");
    }
  }, [clientData]);

  const Client = {
    firstname: firstname,
    lastname: lastname,
    address: address,
    zip_code: zip_code,
    city: city,
    phone: phone,
    email: email,
  };

  const saveClient = async () => {
    if (!validate()) return;

    const Client = {
      firstname: firstname,
      lastname: lastname,
      address: address,
      zip_code: zip_code,
      city: city,
      phone: phone,
      email: email,
    };

    await dbService.addClient(Client);
    fetchClients();
    toggleForm();
  };

  return (
    <div className="z-10 flex justify-center absolute shadow-xl bg-black bg-opacity-50 w-full h-full py-[10vw] px-[20vw]">
      <div className="absolute max-w-screen-md h-[500px] flex flex-col justify-between flex-wrap px-8 bg-bgLight py-8 rounded-lg duration-200">
        <div className="flex justify-between w-full">
          <h3 className="text-3xl font-semibold text-navNormal">Add Client</h3>
          <svg
            onClick={toggleForm}
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
            <div className="w-1/2">
              <input
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                type="text"
                name="firstname"
                id="firstname"
                className={`w-full h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200 ${
                  firstNameError && "border-red-500"
                }`}
                placeholder="First Name"
              />
              {firstNameError && (
                <p className="text-red-500 text-sm">{firstNameError}</p>
              )}
            </div>

            <div className="w-1/2">
              <input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
                name="firstname"
                id="firstname"
                className={`w-full h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200 ${
                  lastNameError && "border-red-500"
                }`}
                placeholder="Last Name"
              />
              {lastNameError && (
                <p className="text-red-500 text-sm">{lastNameError}</p>
              )}
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="w-1/2">
              <input
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                type="text"
                name="firstname"
                id="firstname"
                className={`w-full h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200 ${
                  addressError && "border-red-500"
                }`}
                placeholder="Address"
              />
              {addressError && (
                <p className="text-red-500 text-sm">{addressError}</p>
              )}
            </div>
            <div className="flex justify-between gap-4 w-1/2">
              <div className="w-1/2">
                <input
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="w-full h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200"
                  placeholder="City"
                />
                {cityError && (
                  <p className="text-red-500 text-sm">{cityError}</p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  onChange={(e) => {
                    setZipCode(e.target.value);
                  }}
                  type="text"
                  name="firstname"
                  id="firstname"
                  className={`w-full h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200 ${
                    zipCodeError && "border-red-500"
                  }`}
                  placeholder="Zip Code"
                />
                {zipCodeError && (
                  <p className="text-red-500 text-sm">{zipCodeError}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full justify-between gap-4">
            <div className="w-1/2">
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="text"
                name="firstname"
                id="firstname"
                className={`w-full h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200 ${
                  phoneError && "border-red-500"
                }`}
                placeholder="Phone Number"
              />
              {phoneError && (
                <p className="text-red-500 text-sm">{phoneError}</p>
              )}
            </div>

            <div className="w-1/2">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                name="firstname"
                id="firstname"
                className={`w-full h-10 rounded-lg border-2 focus:outline-none focus:border-accent2 px-4 font-base text-navNormal duration-200 ${
                  emailError && "border-red-500"
                }`}
                placeholder="Email"
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
          </div>
        </div>
        <Button
          method={saveClient}
          style={"bg-accent2 w-[100%] hover:brightness-90"}
          text={"Add Client"}
        />
      </div>
    </div>
  );
};

export default ClientForm;

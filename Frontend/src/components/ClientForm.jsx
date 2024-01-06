import { useState } from "react";
import Button from "./Button";
import { useClientsStore } from "../stores/useClientsStore";
import { toast } from "sonner";

const ClientForm = () => {
  const {
    selectedClient,
    setSelectedClient,
    addClient,
    updateClient,
    toggleClientForm,
  } = useClientsStore();

  const editMode = selectedClient ? true : false;

  const [firstname, setFirstName] = useState(
    editMode ? selectedClient.firstname : "",
  );
  const [lastname, setLastName] = useState(
    editMode ? selectedClient.lastname : "",
  );
  const [zip_code, setZipCode] = useState(
    editMode ? selectedClient.zip_code : "",
  );
  const [city, setCity] = useState(editMode ? selectedClient.city : "");
  const [phone, setPhone] = useState(editMode ? selectedClient.phone : "");
  const [email, setEmail] = useState(editMode ? selectedClient.email : "");
  const [address, setAddress] = useState(
    editMode ? selectedClient.address : "",
  );

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
    const emailPattern =
      /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/;
    const phonePattern =
      /^(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)$/;
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
      setPhoneError("Invalid phone number");
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

    if (selectedClient) {
      toast.promise(updateClient(selectedClient.id, Client), {
        loading: "Updating...",
        success: "Client updated",
        error: "Error while updating",
      });
    } else {
      toast.promise(addClient(Client), {
        loading: "Saving...",
        success: "Client saved",
        error: "Error while saving",
      });
    }

    toggleClientForm();
  };
  return (
    <div className="absolute z-10 flex h-full w-full justify-center bg-zinc-900 bg-opacity-50 py-[10vw] shadow-xl md:px-[20vw] ">
      <div className="flex h-fit max-w-screen-md flex-col flex-wrap justify-between gap-8 rounded-lg bg-white px-4 py-12 duration-200 dark:bg-zinc-800 dark:ring-1 dark:ring-zinc-700 md:absolute md:px-8">
        <div className="flex w-full justify-between">
          <h3 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 ">
            {editMode ? "Edit Client" : "Add Client"}
          </h3>
          <svg
            onClick={() => {
              toggleClientForm();
              setSelectedClient(null);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 rounded-full hover:cursor-pointer dark:text-zinc-50 dark:hover:bg-zinc-700 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex w-full flex-wrap justify-between gap-4">
          <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:gap-4">
            <div className="md:w-1/2">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-400"
              >
                Firstname
              </label>
              <div className="mt-2">
                <input
                  name="firstname"
                  type="text"
                  required
                  defaultValue={selectedClient ? selectedClient.firstname : ""}
                  className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    firstNameError && "ring-uiError dark:ring-uiError"
                  }`}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                {firstNameError && (
                  <p className="text-sm text-uiError">{firstNameError}</p>
                )}
              </div>
            </div>

            <div className="md:w-1/2">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-400"
              >
                Lastname
              </label>
              <div className="mt-2">
                <input
                  name="lastname"
                  type="text"
                  required
                  defaultValue={selectedClient ? selectedClient.lastname : ""}
                  className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    lastNameError && "ring-uiError"
                  }`}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                {lastNameError && (
                  <p className="text-sm text-uiError">{lastNameError}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 md:flex-row md:gap-4">
            <div className="md:w-1/2">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-400"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  name="address"
                  type="text"
                  required
                  defaultValue={selectedClient ? selectedClient.address : ""}
                  className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    addressError && "ring-uiError"
                  }`}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                {addressError && (
                  <p className="text-sm text-uiError">{addressError}</p>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-2 md:w-1/2 md:gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-400"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    name="city"
                    type="text"
                    required
                    defaultValue={selectedClient ? selectedClient.city : ""}
                    className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                      cityError && "ring-uiError"
                    }`}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                  {cityError && (
                    <p className="text-sm text-uiError">{cityError}</p>
                  )}
                </div>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="zip_code"
                  className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-400"
                >
                  Zip Code
                </label>
                <div className="mt-2">
                  <input
                    name="zip_code"
                    type="text"
                    required
                    defaultValue={selectedClient ? selectedClient.zip_code : ""}
                    className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                      zipCodeError && "ring-uiError"
                    }`}
                    onChange={(e) => {
                      setZipCode(e.target.value);
                    }}
                  />
                  {zipCodeError && (
                    <p className="text-sm text-uiError">{zipCodeError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:gap-4">
            <div className="md:w-1/2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-400"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  name="phone"
                  type="text"
                  required
                  defaultValue={selectedClient ? selectedClient.phone : ""}
                  className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    phoneError && "ring-uiError"
                  }`}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                {phoneError && (
                  <p className="text-sm text-uiError">{phoneError}</p>
                )}
              </div>
            </div>

            <div className="md:w-1/2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-400"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="text"
                  required
                  defaultValue={selectedClient ? selectedClient.email : ""}
                  className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    emailError && "ring-uiError"
                  }`}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {emailError && (
                  <p className="text-sm text-uiError">{emailError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <Button
          method={saveClient}
          style="bg-blue-600 w-[100%] hover:bg-blue-500"
          text={editMode ? "Edit Client" : "Add Client"}
        />
      </div>
    </div>
  );
};

export default ClientForm;

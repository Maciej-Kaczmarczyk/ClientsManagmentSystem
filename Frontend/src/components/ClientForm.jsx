import { useState } from "react";
import Button from "./Button";
import { useClientsStore } from "../stores/useClientsStore";
import { toast } from "sonner";
import useClientFormStore from "../stores/useClientFormStore";

const ClientForm = () => {
  const { updateClient, addClient } = useClientsStore();
  const { toggleClientForm, props } = useClientFormStore();
  const { client } = props;

  const [formData, setFormData] = useState({
    firstname: client ? client.firstname : "",
    lastname: client ? client.lastname : "",
    zip_code: client ? client.zip_code : "",
    city: client ? client.city : "",
    phone: client ? client.phone : "",
    email: client ? client.email : "",
    address: client ? client.address : "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "firstname":
      case "lastname":
      case "city":
      case "address":
        return value.trim().length < 2
          ? `${
              name.charAt(0).toUpperCase() + name.slice(1)
            } must be at least 2 characters long`
          : "";
      case "zip_code":
        return /^\d{2}-\d{3}$/.test(value) ? "" : "Invalid zip code";
      case "phone":
        return /^(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)$/.test(
          value,
        )
          ? ""
          : "Invalid phone number";
      case "email":
        return /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/.test(
          value,
        )
          ? ""
          : "Invalid email address";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveClient = async () => {
    if (!validateForm()) return;

    const Client = { ...formData };

    const toastPromise = client
      ? toast.promise(updateClient(client.id, Client), {
          loading: "Updating...",
          success: "Client updated",
          error: "Error while updating",
        })
      : toast.promise(addClient(Client), {
          loading: "Saving...",
          success: "Client saved",
          error: "Error while saving",
        });

    toggleClientForm();
  };
  return (
    <div className="absolute z-10 flex h-full w-full justify-center bg-zinc-900 bg-opacity-50 py-[10vw] shadow-xl md:px-[20vw] ">
      <div className="flex h-fit max-w-screen-md flex-col flex-wrap justify-between gap-8 rounded-lg bg-white px-4 py-12 duration-200 dark:bg-zinc-800 dark:ring-1 dark:ring-zinc-700 md:absolute md:px-8">
        <div className="flex w-full justify-between">
          <h3 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 ">
            {client ? "Edit Client" : "Add Client"}
          </h3>
          <svg
            onClick={() => {
              toggleClientForm();
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
                  value={formData.firstname}
                  className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors.firstname && "ring-uiError dark:ring-uiError"
                  }`}
                  onChange={handleChange}
                />
                {errors.firstname && (
                  <p className="text-sm text-uiError">{errors.firstname}</p>
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
                  defaultValue={client ? client.lastname : ""}
                  className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors.lastname && "ring-uiError"
                  }`}
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <p className="text-sm text-uiError">{errors.lastname}</p>
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
                  defaultValue={client ? client.address : ""}
                  className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors.address && "ring-uiError"
                  }`}
                  onChange={handleChange}
                />
                {errors.address && (
                  <p className="text-sm text-uiError">{errors.address}</p>
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
                    defaultValue={client ? client.city : ""}
                    className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                      errors.city && "ring-uiError"
                    }`}
                    onChange={handleChange}
                  />
                  {errors.city && (
                    <p className="text-sm text-uiError">{errors.city}</p>
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
                    defaultValue={client ? client.zip_code : ""}
                    className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                      errors.zip_code && "ring-uiError"
                    }`}
                    onChange={handleChange}
                  />
                  {errors.zip_code && (
                    <p className="text-sm text-uiError">{errors.zip_code}</p>
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
                  defaultValue={client ? client.phone : ""}
                  className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors.phone && "ring-uiError"
                  }`}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="text-sm text-uiError">{errors.phone}</p>
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
                  defaultValue={client ? client.email : ""}
                  className={`block w-full rounded-md py-1.5 pl-3 text-zinc-900 shadow-sm outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:focus:ring-blue-600 sm:text-sm sm:leading-6 ${
                    errors.email && "ring-uiError"
                  }`}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-sm text-uiError">{errors.email}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <Button
          method={saveClient}
          style="bg-blue-600 w-[100%] hover:bg-blue-500"
          text={client ? "Edit Client" : "Add Client"}
        />
      </div>
    </div>
  );
};

export default ClientForm;

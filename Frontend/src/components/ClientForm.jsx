import { useState } from "react";
import Button from "./Button";
import { useClientsStore } from "../stores/useClientsStore";
import { toast } from "sonner";

const ClientForm = () => {
  const selectedClient = useClientsStore((state) => state.selectedClient);
  const setSelectedClient = useClientsStore((state) => state.setSelectedClient);

  const editMode = selectedClient ? true : false;

  const [firstname, setFirstName] = useState(editMode ? selectedClient.firstname : "");
  const [lastname, setLastName] = useState(editMode ? selectedClient.lastname : "");
  const [zip_code, setZipCode] = useState(editMode ? selectedClient.zip_code : "");
  const [city, setCity] = useState(editMode ? selectedClient.city : "");
  const [phone, setPhone] = useState(editMode ? selectedClient.phone : "");
  const [email, setEmail] = useState(editMode ? selectedClient.email : "");
  const [address, setAddress] = useState(editMode ? selectedClient.address : "");

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
    const phonePattern = /^(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)$/;
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

  const addClient = useClientsStore((state) => state.addClient);
  const updateClient = useClientsStore((state) => state.updateClient);
  const toggleClientForm = useClientsStore((state) => state.toggleClientForm);
  const clientFormVisible = useClientsStore((state) => state.clientFormVisible);

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
    <div className="z-10 flex justify-center absolute shadow-xl bg-uiQuaternary bg-opacity-50 w-full h-full py-[10vw] px-[20vw]">
      <div className="absolute max-w-screen-md h-[500px] flex flex-col justify-between flex-wrap px-8 bg-uiPrimary py-8 rounded-lg duration-200">
        <div className="flex justify-between w-full">
          <h3 className="text-3xl font-semibold text-textPrimary">{editMode ? "Edit Client" : "Add Client"}</h3>
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
            className="w-6 h-6 hover:cursor-pointer hover:bg-uiTertiary rounded-full"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
                className={`w-full h-10 rounded-lg border-2 focus:outline-none focus:border-uiAccent px-4 font-base text-textPrimary duration-200 ${firstNameError && "border-uiError"}`}
                placeholder="First Name"
                defaultValue={selectedClient ? selectedClient.firstname : ""}
              />
              {firstNameError && <p className="text-uiError text-sm">{firstNameError}</p>}
            </div>

            <div className="w-1/2">
              <input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                defaultValue={selectedClient ? selectedClient.lastname : ""}
                type="text"
                name="firstname"
                id="firstname"
                className={`w-full h-10 rounded-lg border-2 focus:outline-none focus:border-uiAccent px-4 font-base text-textPrimary duration-200 ${lastNameError && "border-uiError"}`}
                placeholder="Last Name"
              />
              {lastNameError && <p className="text-uiError text-sm">{lastNameError}</p>}
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="w-1/2">
              <input
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                defaultValue={selectedClient ? selectedClient.address : ""}
                type="text"
                name="firstname"
                id="firstname"
                className={`w-full h-10 rounded-lg border-2 focus:outline-none focus:border-uiAccent px-4 font-base text-textPrimary duration-200 ${addressError && "border-uiError"}`}
                placeholder="Address"
              />
              {addressError && <p className="text-uiError text-sm">{addressError}</p>}
            </div>
            <div className="flex justify-between gap-4 w-1/2">
              <div className="w-1/2">
                <input
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  defaultValue={selectedClient ? selectedClient.city : ""}
                  type="text"
                  name="firstname"
                  id="firstname"
                  className={`w-full h-10 rounded-lg border-2 focus:outline-none focus:border-uiAccent px-4 font-base text-textPrimary duration-200 ${cityError && "border-uiError"}`}
                  placeholder="City"
                />
                {cityError && <p className="text-uiError text-sm">{cityError}</p>}
              </div>
              <div className="w-1/2">
                <input
                  onChange={(e) => {
                    setZipCode(e.target.value);
                  }}
                  defaultValue={selectedClient ? selectedClient.zip_code : ""}
                  type="text"
                  name="firstname"
                  id="firstname"
                  className={`w-full h-10 rounded-lg border-2 focus:outline-none focus:border-uiAccent px-4 font-base text-textPrimary duration-200 ${zipCodeError && "border-uiError"}`}
                  placeholder="Zip Code"
                />
                {zipCodeError && <p className="text-uiError text-sm">{zipCodeError}</p>}
              </div>
            </div>
          </div>

          <div className="flex w-full justify-between gap-4">
            <div className="w-1/2">
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                defaultValue={selectedClient ? selectedClient.phone : ""}
                type="text"
                name="firstname"
                id="firstname"
                className={`w-full h-10 rounded-lg border-2 focus:outline-none focus:border-uiAccent px-4 font-base text-textPrimary duration-200 ${phoneError && "border-uiError"}`}
                placeholder="Phone Number"
              />
              {phoneError && <p className="text-uiError text-sm">{phoneError}</p>}
            </div>

            <div className="w-1/2">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                defaultValue={selectedClient ? selectedClient.email : ""}
                type="text"
                name="firstname"
                id="firstname"
                className={`w-full h-10 rounded-lg border-2 focus:outline-none focus:border-uiAccent px-4 font-base text-textPrimary duration-200 ${emailError && "border-uiError"}`}
                placeholder="Email"
              />
              {emailError && <p className="text-uiError text-sm">{emailError}</p>}
            </div>
          </div>
        </div>
        <Button method={saveClient} style={"bg-uiAccent w-[100%] hover:brightness-90"} text={editMode ? "Edit Client" : "Add Client"} />
      </div>
    </div>
  );
};

export default ClientForm;

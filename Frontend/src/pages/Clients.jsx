import { useState } from "react";
import ClientCard from "../components/ClientCard";
import Button from "../components/Button";
import { useClientsStore } from "../stores/useClientsStore";
import { useClientFilter } from "../hooks/useClientFilter";
import ClientsListSkeleton from "../components/ClientsListSkeleton";
import AddClientIcon from "../assets/icons/addClientIcon.svg";
import SearchIcon from "../assets/icons/searchIcon.svg";
import FilterIcon from "../assets/icons/filterIcon.svg";
import RefreshIcon from "../assets/icons/refreshIcon.svg";

function Clients() {
  const [formVisible, setFormVisible] = useState(false);
  const [searchString, setSearchString] = useState("");

  // fetch clients function from store
  const { clients, fetchClients, isLoading, toggleClientForm } =
    useClientsStore();

  const filteredClients = useClientFilter(clients, searchString); // custom hook for filtering clients

  return (
    <>
      <div className="flex w-full max-w-screen-xl flex-col rounded-lg bg-uiPrimary dark:bg-darkUiPrimary pb-1">
        <div className="flex h-1/2 w-full flex-col items-center justify-between gap-8 p-8 lg:flex-row">
          <div className="flex w-full gap-8">
            <div className="w-full lg:w-1/2">
              <label className="sr-only mb-2 text-sm font-medium dark:text-white">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon className="h-5 w-5 text-textTertiary" />
                </div>
                <input
                  type="search"
                  className="font-base block h-10 w-full rounded-lg border-[1px] dark:border-darkUiTertiary p-4 pl-10 text-sm text-textSecondary bg-uiPrimary dark:bg-darkUiSecondary duration-200 focus:border-uiAccent focus:outline-none"
                  placeholder="Search"
                  onChange={(e) => setSearchString(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-8 lg:w-fit">
            <Button
              icon={AddClientIcon}
              text="Add Client"
              method={() => toggleClientForm()}
              style="bg-uiAccent hover:brightness-90 w-36"
            />
            <RefreshIcon
              onClick={fetchClients}
              className="h-6 w-6 cursor-pointer rounded-full hover:bg-uiTertiary"
            />
          </div>
        </div>

        <ul className="hidden items-center justify-between gap-4 bg-uiPrimary dark:bg-darkUiPrimary px-8 py-2 xl:flex ">
          <div className="flex items-center justify-center gap-32 text-sm text-textSecondary">
            <div className="w-60">
              <p className="w-fit">Name</p>
            </div>

            <div className="w-60">
              <p className="w-fit">Contact</p>
            </div>

            <div className="w-60">
              <p className="w-fit">Address</p>
            </div>
          </div>
        </ul>

        {isLoading ? (
          <ClientsListSkeleton />
        ) : (
          <ul>
            {filteredClients ? (
              filteredClients.map((client) => (
                <ClientCard
                  key={client.email}
                  client={client}
                  fetchClients={fetchClients}
                  toggleForm={() => setFormVisible(!formVisible)}
                />
              ))
            ) : (
              <ClientsListSkeleton />
            )}
          </ul>
        )}
      </div>
    </>
  );
}

export default Clients;

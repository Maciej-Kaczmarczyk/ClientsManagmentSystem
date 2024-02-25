import { useEffect, useState } from "react";
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
  const [searchString, setSearchString] = useState("");

  // fetch clients function from store
  const { clients, fetchClients, isLoading, toggleClientForm } =
    useClientsStore();

  // fetch clients on mount if there are no clients
  useEffect(() => {
    clients.length === 0 && fetchClients();
  }, []);

  const filteredClients = useClientFilter(clients, searchString); // custom hook for filtering clients

  return (
    <>
      <div className="flex w-full max-w-screen-xl flex-col rounded-lg border-[0px] bg-white pb-1 duration-200 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex h-1/2 w-full flex-col items-center justify-between gap-8 p-8 duration-200 lg:flex-row">
          <div className="flex w-full gap-8">
            <div className="w-full lg:w-1/2">
              <label className="sr-only mb-2 text-sm font-medium dark:text-white">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="search"
                  className="font-base block h-10 w-full rounded-lg  bg-white p-4 py-1.5 pl-10 text-sm text-zinc-900 outline-none ring-1 ring-inset ring-zinc-300 duration-200 placeholder:text-zinc-400 focus:outline-none focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-600 dark:focus:bg-zinc-700 dark:focus:ring-blue-600 sm:text-sm sm:leading-6"
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
              style="bg-blue-600 w-40 hover:bg-blue-500"
            />
            <RefreshIcon
              onClick={fetchClients}
              className="h-6 w-6 cursor-pointer rounded-full text-zinc-900 hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-700"
            />
          </div>
        </div>

        {isLoading ? (
          <ClientsListSkeleton />
        ) : (
          <ul>
            {filteredClients ? (
              filteredClients.map((client) => (
                <ClientCard
                  key={client.email}
                  client={client}
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

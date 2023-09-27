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

  const fetchClients = useClientsStore((state) => state.fetchClients); // fetch clients function from store
  const isLoading = useClientsStore((state) => state.isLoading); // get loading state from store
  const toggleClientForm = useClientsStore((state) => state.toggleClientForm); // toggle client form

  const clients = useClientsStore((state) => state.clients); // get clients from store
  const filteredClients = useClientFilter(clients, searchString); // custom hook for filtering clients

  return (
    <>
      <div className="flex flex-col rounded-lg border-[1px] pb-1 bg-uiPrimary w-full max-w-screen-xl">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 p-8 w-full h-1/2">
          <div className="w-full flex gap-8">
            <form className="w-full lg:w-1/2">
              <label className="mb-2 text-sm font-medium sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon className="w-5 h-5 text-textTertiary" />
                </div>
                <input type="search" className="block w-full h-10 p-4 pl-10 text-sm duration-200 border-[1px] font-base focus:border-uiAccent focus:outline-none text-textSecondary rounded-lg" placeholder="Search" onChange={(e) => setSearchString(e.target.value)} />
              </div>
            </form>
          </div>

          <div className="w-full lg:w-fit flex items-center justify-between gap-8">
            <Button icon={AddClientIcon} text="Add Client" method={() => toggleClientForm()} style="bg-uiAccent hover:brightness-90 w-36" />
            <RefreshIcon onClick={fetchClients} className="w-6 h-6 cursor-pointer hover:bg-uiTertiary rounded-full" />
          </div>
        </div>

        <ul className="hidden xl:flex justify-between items-center gap-4 px-8 py-2 bg-uiPrimary ">
          <div className="flex items-center justify-center gap-32 text-sm">
            <div className="flex flex-col w-60">
              <p className="w-fit text-textSecondary font-normal">Name</p>
            </div>

            <div className="flex flex-col w-60">
              <p className="w-fit text-textSecondary font-normal">Contact</p>
            </div>

            <div className="flex flex-col w-60">
              <p className="w-fit text-textSecondary font-md">Address</p>
            </div>
          </div>
        </ul>

        {isLoading ? <ClientsListSkeleton /> : <ul>{filteredClients ? filteredClients.map((client) => <ClientCard key={client.email} client={client} fetchClients={fetchClients} toggleForm={() => setFormVisible(!formVisible)} />) : <ClientsListSkeleton />}</ul>}
      </div>
    </>
  );
}

export default Clients;

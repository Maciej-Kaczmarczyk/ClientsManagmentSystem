import { useState, useEffect } from "react";

export const useClientFilter = (clients, searchString) => {
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    const searchLower = searchString.toLowerCase();

    const results = searchString
      ? clients.filter(({ firstname, lastname, email, phone, address, city, zip_code }) =>
          [firstname, lastname, email, phone, address, city, zip_code].some((field) => field.toLowerCase().includes(searchLower))
        )
      : clients;

    setFilteredClients(results);
  }, [clients, searchString]);

  return filteredClients;
};

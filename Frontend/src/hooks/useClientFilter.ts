import { useState, useEffect } from "react";
import { Client } from "../types/types";

/**
 * A custom hook that filters an array of clients based on a search string.
 */

export const useClientFilter = (
  clientsArray: Array<Client>,
  searchString: string,
) => {
  const [filteredClients, setFilteredClients] = useState<Array<Client>>([]);

  useEffect(() => {
    const searchLower = searchString.toLowerCase();

    const results = searchString
      ? clientsArray.filter(
          ({ firstname, lastname, email, phone, address, city, zip_code }) =>
            [firstname, lastname, email, phone, address, city, zip_code].some(
              (field) => field.toLowerCase().includes(searchLower),
            ),
        )
      : clientsArray;

    setFilteredClients(results);
  }, [clientsArray, searchString]);

  return filteredClients;
};

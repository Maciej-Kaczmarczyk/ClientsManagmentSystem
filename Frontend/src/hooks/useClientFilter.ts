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
          ({ firstName, lastName, email, phone, address, city, zipCode }) =>
            [firstName, lastName, email, phone, address, city, zipCode].some(
              (field) => field.toLowerCase().includes(searchLower),
            ),
        )
      : clientsArray;

    setFilteredClients(results);
  }, [clientsArray, searchString]);

  return filteredClients;
};

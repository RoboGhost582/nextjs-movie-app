import React, { createContext, useState, useEffect} from "react";

export const SearchContext = createContext(null);

export const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([])

  return (
    <SearchContext.Provider
      value={{search, setSearch, user, setUser }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
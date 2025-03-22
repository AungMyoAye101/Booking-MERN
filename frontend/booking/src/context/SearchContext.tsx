import { useContext, useState, createContext } from "react";

type SearchType = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  handleSearch: (destination: string, checkIn: Date, checkOut: Date, guests: number) => void;

}

const SearchContext = createContext<SearchType | undefined>(undefined);
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState({
    destination: "",
    checkIn: new Date(),
    checkOut: new Date(),
    guests: 1,
  });

  const handleSearch = (destination: string, checkIn: Date, checkOut: Date, guests: number) => {
    setSearch((prev) => ({
      ...prev,
      destination,
      checkIn,
      checkOut,
      guests,
    }));
  }

  return (
    <SearchContext.Provider value={{ destination: search.destination, checkIn: search.checkIn, checkOut: search.checkOut, guests: search.guests, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
}


export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
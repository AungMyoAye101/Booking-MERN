import { useContext, useState, createContext, useEffect } from "react";
import { HotelType } from "../lib/types";

type SearchType = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  handleSearch: (destination: string, checkIn: Date, checkOut: Date, guests: number) => void;
  loading: boolean,
  searchData: HotelType[] | undefined

}

const SearchContext = createContext<SearchType | undefined>(undefined);
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState({
    destination: "",
    checkIn: new Date(),
    checkOut: new Date(),
    guests: 1,
  });

  const [searchData, setSearchData] = useState<HotelType[]>([])

  const handleSearch = (destination: string, checkIn: Date, checkOut: Date, guests: number) => {
    setSearch((prev) => ({
      ...prev,
      destination,
      checkIn,
      checkOut,
      guests,
    }));
  }

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const debounceFn = async () => {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:5000/api/search?destination=${search.destination}&checkIn=${search.checkIn}&checkOut=${search.checkOut}&guests=${search.guests}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to search")
        }
        const data = await res.json()
        setSearchData(data)
        setLoading(false)
        console.log(data)
      } catch (error) {
        setLoading(false)
        console.log(error)
        throw new Error("Failed to search ")
      }
      setLoading(false)
    }

    debounceFn()


  }, [search.destination]);

  return (
    <SearchContext.Provider value={{ destination: search.destination, checkIn: search.checkIn, checkOut: search.checkOut, guests: search.guests, handleSearch, loading, searchData }}>
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
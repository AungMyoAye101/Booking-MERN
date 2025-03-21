import { de } from "date-fns/locale";
import { createContext, useContext, useEffect, useState } from "react";

type SearchType = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childrenCount: number;
  hotelId: string;
  saveSearch: (
    distination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childrenCount: number
  ) => void;
};
export const SearchContext = createContext<SearchType | undefined>(undefined);

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [destination, setDestination] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [adultCount, setAdultCount] = useState<number>(0);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [hotelId, setHotelId] = useState<string>("");

  const saveSearch = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childrenCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildrenCount(childrenCount);
    if (hotelId) {
      setHotelId(hotelId);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:5173/search?destination=${destination}`);
        const search = await res.json();
        console.log(search);
      } catch (error) {
        console.log(error);

      }

    }, 1000);

    return () => clearTimeout(debounce);
  }, [destination]);


  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childrenCount,
        hotelId,
        saveSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context;
};

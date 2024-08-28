import React, { useContext, useState } from "react";

type SearchContext = {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotelId: string;
    saveSearchValues: (
      destination: string,
      checkIn: Date,
      checkOut: Date,
      adultCount: number,
      childCount: number
    ) => void;
  };
  
  const SearchContext = React.createContext<SearchContext | undefined>(undefined);

  type SearchContextProviderProps = {
    children: React.ReactNode;
  }
  export const SearchContextProvider = ({children}: SearchContextProviderProps) => {
    const [destination, setDestination] = useState<string>(() =>
       sessionStorage.getItem("destination") || "");

    const [checkIn, setCheckIn] = useState<Date>(() => new Date(sessionStorage.getItem('checkIn') || new Date().toISOString()));

    const [checkOut, setCheckOut] = useState<Date>(() =>
      new Date(sessionStorage.getItem('checkOut') || new Date().toISOString())
    );

    const [adultCount, setAdultCount] = useState<number>(() =>
      parseInt(sessionStorage.getItem('adultCount') || "1")
    );

    const [childCount, setChildCount] = useState<number>(() =>
      parseInt(sessionStorage.getItem('childCount') || "0")
  );

    const[hotelId, setHotelId] = useState<string>(() =>
      sessionStorage.getItem("hotelId") || "");

    const saveSearchValues = (destination: string, checkIn: Date, checkOut:Date, adultCount:number, childCount:number

                             ) =>{
                                setDestination(destination);
                                sessionStorage.setItem("destination", destination);
                                setCheckIn(checkIn);
                                sessionStorage.setItem("checkIn", checkIn.toISOString());
                                setCheckOut(checkOut);
                                sessionStorage.setItem("checkOut", checkOut.toISOString());
                                setAdultCount(adultCount);
                                sessionStorage.setItem("adultCount", adultCount.toString());
                                setChildCount(childCount);
                                sessionStorage.setItem("childCount", childCount.toString());
                                if(hotelId)
                                {
                                    setHotelId(hotelId);
                                    sessionStorage.setItem("hotelId", hotelId.toString());
                                }
                             };
    return (
        <SearchContext.Provider value={{
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount,
            hotelId,
            saveSearchValues,
        }}>
            {children}
        </SearchContext.Provider>
    )
  }

  export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
};
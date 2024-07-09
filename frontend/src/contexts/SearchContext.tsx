import React from "react";

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    desination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const searchContext = React.createContext<searchContext | undefined>(
  undefined
);

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = React.useState<string>("");
  const [checkIn, setCheckIn] = React.useState<Date>(new Date());
  const [checkOut, setCheckOut] = React.useState<Date>(new Date());
  const [adultCount, setAdultCount] = React.useState<number>(1);
  const [childCount, setChildCount] = React.useState<number>(0);
  const [hotelId, setHotelId] = React.useState<string>("");

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }
  };

  return (
    <searchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = React.useContext(searchContext);
  return context as SearchContext;
};

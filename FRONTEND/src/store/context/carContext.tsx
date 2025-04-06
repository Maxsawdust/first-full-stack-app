import { createContext, useState } from "react";
import { CarType } from "../../interfaces/CarInterface";

// creating CarContextType
type CarContextType = {
  cars: CarType[];
  setCars: (value: CarType[]) => void;
};

// creating default context
export const CarContext = createContext<CarContextType>({
  cars: [],
  setCars: () => {},
});

import React from "react";

export default function CarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // state to store cars data from db
  const [cars, setCars] = useState<CarType[]>([]);

  return (
    <CarContext.Provider value={{ cars, setCars }}>
      {children}
    </CarContext.Provider>
  );
}

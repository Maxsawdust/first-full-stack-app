import { createContext, useState, useEffect } from "react";
import { CarType } from "../../interfaces/CarInterface";

// creating CarContextType
type CarContextType = {
  cars: CarType[];
  setCars: (value: CarType[]) => void;
  // function to refresh DB fetch
  refreshCars: () => Promise<void>;
};
// creating default context
export const CarContext = createContext<CarContextType>({
  cars: [],
  setCars: () => {},
  refreshCars: async () => {},
});

export default function CarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // state to store cars data from db
  const [cars, setCars] = useState<CarType[]>([]);

  const refreshCars = async () => {
    try {
      // geth the response from db
      const response = await fetch("http://localhost:5000/cars");

      // if the response isn't ok
      if (!response.ok) {
        // throw an error
        throw new Error(
          `Issue retrieving cars from database. status ${response.status}`
        );
      }
      const data = await response.json();
      setCars(data);
      console.log(`Cars received: ${data.length} cars`);
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
    }
  };

  // useEffect to get the cars from DB on load
  useEffect(() => {
    refreshCars();
  }, []);

  return (
    <CarContext.Provider value={{ cars, setCars, refreshCars }}>
      {children}
    </CarContext.Provider>
  );
}

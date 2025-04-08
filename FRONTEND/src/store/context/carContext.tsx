import { createContext, useState, useEffect } from "react";
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

export default function CarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // state to store cars data from db
  const [cars, setCars] = useState<CarType[]>([]);

  // useEffect to get the cars from DB on load
  useEffect(() => {
    try {
      // geth the response from db
      fetch("http://localhost:5000/cars")
        .then((response) => {
          // if the response isn't ok
          if (!response.ok) {
            // throw an error
            throw new Error(
              `Issue retrieving cars from database. status ${response.status}`
            );
          }
          // else return the response in json format
          return response.json();
        })
        .then((data: CarType[]) => {
          // then setCars(data) so that other components can access it
          setCars(data);
          // console message to let you know it was successful
          console.log(`Cars received: ${data.length} cars`);
        });
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
    }
  }, []);

  return (
    <CarContext.Provider value={{ cars, setCars }}>
      {children}
    </CarContext.Provider>
  );
}

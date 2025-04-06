import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AddCar, HomePage, Layout, UpdateCars } from "./pages";
import useCars from "./store/hooks/useCars";
import { useEffect } from "react";
import { CarType } from "./interfaces/CarInterface";

function App() {
  const { setCars } = useCars();

  // useEffect to get the cars from database on app load.
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
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/batch-update" element={<UpdateCars />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import { CarCard } from "../../components";
import { useState } from "react";
import useCars from "../../store/hooks/useCars";
import "./HomePage.css";

export default function HomePage() {
  // calling custom hook to get cars from db
  const { cars, setCars } = useCars();
  // state to control button functionality
  const [showingOlder, setShowingOlder] = useState(false);
  const { refreshCars } = useCars();

  // function that gets all cars older than 5 years
  const showOlderCars = async () => {
    // if the button is pressed when already displaying old cars, then reset the states.
    if (showingOlder) {
      refreshCars();
      setShowingOlder(false);
      return;
    }

    // otherwise, it'll need to fetch the "/old" route to filter the cars
    try {
      const response = await fetch("http://localhost:5000/cars/old");
      const data = await response.json();
      setCars(data);
      setShowingOlder(true);
      console.log("success! ", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="HomePage sub-page">
      <h1 className="page-heading">ALL CARS IN INVENTORY</h1>
      <button className="blue-slide filter-by-old" onClick={showOlderCars}>
        {/* controlling button text based on state */}
        {showingOlder ? "SHOW ALL CARS" : "SHOW OLDER CARS"}
      </button>
      {cars.length > 0 ? (
        <div className="cars-container">
          {/* map through cars array to return a CarCard for each of the cars */}
          {cars.map((car) => {
            return <CarCard car={car} key={car._id} />;
          })}
        </div>
      ) : (
        <div className="no-cars">
          <h2 className="page-subheading">
            {showingOlder
              ? "NO CARS OLDER THAN FIVE YEARS IN INVENTORY"
              : "NO CARS IN INVENTORY"}
          </h2>
          <h2 className="page-subheading">ADD A CAR</h2>
        </div>
      )}
    </div>
  );
}

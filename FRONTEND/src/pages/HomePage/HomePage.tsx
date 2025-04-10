import { CarCard, EditCarsModal } from "../../components";
import useCars from "../../store/hooks/useCars";
import "./HomePage.css";

export default function HomePage() {
  // calling custom hook to get cars from db
  const { cars } = useCars();

  return (
    <div className="HomePage sub-page">
      <h1 className="page-heading">ALL CARS IN INVENTORY</h1>

      <div className="cars-container">
        {/* map through cars array to return a CarCard for each of the cars */}
        {cars.map((car) => {
          return <CarCard car={car} key={car._id} />;
        })}
      </div>
    </div>
  );
}

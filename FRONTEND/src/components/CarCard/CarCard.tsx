import "./CarCard.css";
import { OwnerCard } from "../";
import { CarType } from "../../interfaces/CarInterface";

export default function CarCard({ car }: { car: CarType }) {
  // map through owners array to get currentOwner name
  const currentOwner = car.owners.find(
    (owner) => owner._id === car.currentOwner
  );

  return (
    <div className="CarCard">
      <div className="card-header">
        <div>
          <h2>{car.registration}</h2>
          <p>YEAR: {car.year}</p>
          <p>PRICE: {car.price}</p>
        </div>

        <div>
          <p>
            <b>CREATED ON:</b> {new Date(car.creationDate).toDateString()}
          </p>
          <p>
            <b>UPDATED ON:</b> {new Date(car.updatedDate).toDateString()}
          </p>
        </div>
      </div>

      <div className="card-body">
        <div className="car-info">
          <h3>MAKE: {car.make}</h3>
          <h3>MODEL: {car.model}</h3>
          <h3>
            CURRENT OWNER:{" "}
            {`${currentOwner?.firstName} ${currentOwner?.lastName}`}
          </h3>
        </div>

        <div className="owners-container">
          {car.owners.map((owner) => {
            return <OwnerCard owner={owner} key={owner._id} />;
          })}
        </div>

        <div className="control-buttons">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000">
              <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

import { useContext } from "react";
import { CarContext } from "../context/carContext";

export default function useCars() {
  const context = useContext(CarContext);
  return context;
}

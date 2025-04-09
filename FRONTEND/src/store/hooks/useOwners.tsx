import { useContext } from "react";
import { OwnerContext } from "../context/ownerContext";

// hook to get owners state
export default function useOwners() {
  const context = useContext(OwnerContext);
  return context;
}

import { useContext } from "react";
import { MenuContext } from "../context/appContext";

export default function useMenu() {
  const context = useContext(MenuContext);
  return context;
}

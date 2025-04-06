import { useContext } from "react";
import { MenuContext } from "../context/menuContext";

export default function useMenu() {
  const context = useContext(MenuContext);
  return context;
}

import { useContext } from "react";
import { ModalContext } from "../context/modalContext";

export default function useModal() {
  const context = useContext(ModalContext);
  return context;
}

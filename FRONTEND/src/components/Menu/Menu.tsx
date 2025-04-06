import useMenu from "../../store/hooks/useMenu";
import { NavButton } from "../";
import "./Menu.css";

export default function Menu() {
  const { menuOpen } = useMenu();

  return (
    <div className="Menu">
      <div
        className={`menu-nav ${menuOpen ? "shown" : "hidden"}`}
        style={{ "--rot-amount": "7deg" } as React.CSSProperties}>
        <NavButton page="/">SHOW CARS</NavButton>
        <NavButton page="/add-car">ADD CAR</NavButton>
        <NavButton page="/batch-update">UPDATE CARS</NavButton>
      </div>
      <div
        className={`cars-amount ${menuOpen ? "shown" : "hidden"}`}
        style={{ "--rot-amount": "-10deg" } as React.CSSProperties}>
        CARS IN INVENTORY: 0
      </div>
    </div>
  );
}

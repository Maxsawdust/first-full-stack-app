import useMenu from "../../store/hooks/useMenu";
import "./MenuButton.css";

export default function MenuButton() {
  // local state to control the display of the menu component
  const { menuOpen, setMenuOpen } = useMenu();
  // when the button is clicked, toggle the menu
  // this controls various style elements like rotation, translationm and color
  const openMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <button
      className="MenuButton"
      onClick={openMenu}
      style={menuOpen ? { borderColor: "var(--tertiary-color)" } : {}}>
      <div
        className="button-contents"
        style={
          menuOpen
            ? {
                transform: "translateY(calc(-50% - .45rem))",
                color: "var(--tertiary-color)",
              }
            : {}
        }>
        <span>MENU</span>
        <span>CLOSE</span>
      </div>
      <span
        className="menubutton-icon"
        style={menuOpen ? { transform: "rotate(270deg)" } : {}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32px"
          viewBox="0 -960 960 960"
          width="32px"
          fill={menuOpen ? "#0a21c0" : "#000"}>
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
        </svg>
      </span>
    </button>
  );
}

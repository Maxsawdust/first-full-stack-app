import { useNavigate } from "react-router-dom";
import "./NavButton.css";

type NavButtonProps = {
  children: string;
  page: "/" | "/add-car" | "/batch-update";
};

export default function NavButton({ children, page }: NavButtonProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(page);
  };

  return (
    <button className="NavButton" onClick={handleClick}>
      {children}
      <span></span>
    </button>
  );
}

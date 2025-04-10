import { OwnerType } from "../../interfaces/CarInterface";
import { EditOwnerModal } from "../";
import "./OwnerCard.css";
import useModal from "../../store/hooks/useModal";
import useOwners from "../../store/hooks/useOwners";

type OwnerCardProps = {
  owner?: OwnerType;
  hasEditButtons?: boolean;
};

export default function OwnerCard({ owner, hasEditButtons }: OwnerCardProps) {
  // getting modal state from context
  const { setOwnersModalShown, setOwnerToEdit } = useModal().editOwners;
  const { owners, setOwners } = useOwners();

  // splitting address into array to display it on separate lines
  const address = owner?.address.split(", ");

  if (!owner) {
    return (
      <div className="OwnerCard">
        <div className="empty-owner-card">
          <h2>NO CURRENT OWNERS</h2>
        </div>
      </div>
    );
  }

  const deleteOwner = () => {
    setOwners(owners.filter((o) => o._id !== owner._id));
  };

  return (
    <div className="OwnerCard">
      <div className="owner-info">
        <h3>FIRST NAME: {owner.firstName}</h3>
        <h3>LAST NAME: {owner.lastName}</h3>
        <h3>STATUS: {owner.isCurrent ? "Current Owner" : "Previous Owner"}</h3>
      </div>

      <div className="owner-address">
        <h3>ADDRESS:</h3>
        {address?.map((line, index) => {
          return <p key={index}>{line}</p>;
        })}
      </div>

      {hasEditButtons && (
        <div className="owner-card-control-buttons">
          <button type="button" onClick={deleteOwner}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000">
              <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
            </svg>
          </button>

          <button
            onClick={() => {
              setOwnersModalShown(true);
              setOwnerToEdit(owner);
            }}
            type="button"
            className="owner-card-edit-button">
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
      )}
    </div>
  );
}

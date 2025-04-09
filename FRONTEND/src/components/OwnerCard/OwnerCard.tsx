import { OwnerType } from "../../interfaces/CarInterface";
import "./OwnerCard.css";

export default function OwnerCard({ owner }: { owner?: OwnerType }) {
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
    </div>
  );
}

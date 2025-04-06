import { OwnerType } from "../../interfaces/CarInterface";
import "./OwnerCard.css";

export default function OwnerCard({ owner }: { owner: OwnerType }) {
  return (
    <div className="OwnerCard">
      <div className="owner-info">
        <h3>FIRST NAME: {owner.firstName}</h3>
        <h3>LAST NAME: {owner.lastName}</h3>
        <h3>IS CURRENT: {String(owner.isCurrent)}</h3>
      </div>

      <div className="owner-address">
        <h3>ADDRESS:</h3>
        <p>{owner.address}</p>
      </div>
    </div>
  );
}

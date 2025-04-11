import { OwnerType } from "../../interfaces/CarInterface";
import "./OwnerList.css";

type OwnersListProps = {
  owners: OwnerType[];
};

export default function OwnersList({ owners }: OwnersListProps) {
  return (
    <ul className="owners-list">
      {owners.map((owner, index) => {
        return (
          <li className="owner-details" key={`${owner.firstName}-${index}`}>
            <p className="form-owner-name">{`${owner.firstName} ${owner.lastName}`}</p>
            <p className="form-owner-address">{owner.address}</p>
            <p className="form-owner-status">
              {owner.isCurrent ? "Current Owner" : "Previous Owner"}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

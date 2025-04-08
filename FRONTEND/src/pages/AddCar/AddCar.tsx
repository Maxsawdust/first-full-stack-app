import "./AddCar.css";
import { FormInput, AddOwner } from "../../components";
import { useState } from "react";

export default function AddCar() {
  const [ownersModalShown, setOwnersModalShown] = useState(false);

  return (
    <div className="AddCar sub-page">
      <h1 className="page-heading">ADD A CAR TO THE DATABASE</h1>
      <h2 className="page-subheading">PLEASE FILL OUT THE FORM BELOW</h2>

      <form className="add-car-form">
        <div className="input-container">
          <FormInput value="make">ENTER CAR MAKE</FormInput>
          <FormInput value="model">ENTER CAR MODEL</FormInput>
          <FormInput value="registration">ENTER REG NUMBER</FormInput>

          <FormInput value="year">ENTER PROD. YEAR</FormInput>
          <FormInput value="price">ENTER PRICE</FormInput>
        </div>

        <div className="add-car-owners">
          <div>
            <h2 className="page-subheading">ADD CURRENT OR PREVIOUS OWNERS</h2>
            <button
              type="button"
              className="display-add-owners-modal"
              onClick={() => setOwnersModalShown(true)}
            >
              ADD OWNER
            </button>
          </div>

          <ul className="owners-list"></ul>
        </div>
      </form>
      {ownersModalShown ? <AddOwner /> : null}
    </div>
  );
}

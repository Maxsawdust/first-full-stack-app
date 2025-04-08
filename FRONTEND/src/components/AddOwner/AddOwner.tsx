import "./AddOwner.css";
import { FormInput } from "../";

export default function AddOwner() {
  return (
    //
    <div className="AddOwner">
      <div className="owner-modal">
        <h2 className="page-subheading">ADD OWNER</h2>
        <button className="owners-close-button">X</button>
        <form className="add-owner-form">
          <div className="owner-detail-inputs">
            <FormInput value="firsName">FIRST NAME</FormInput>
            <FormInput value="lastName">LAST NAME</FormInput>
          </div>

          <div className="owner-address-input">
            <FormInput value="address">ADDRESS</FormInput>
          </div>

          <div className="isCurrent-radios">
            <p>IS THIS PERSON THE CURRENT OWNER?</p>
            <div>
              <label className="isCurrent-label">
                <input type="radio" name="isCurrent" value="true" />
                YES
              </label>
              <label className="isCurrent-label">
                <input type="radio" name="isCurrent" value="false" />
                NO
              </label>
            </div>
          </div>

          <button type="submit" className="add-owner-button">
            ADD OWNER
          </button>
        </form>
      </div>
    </div>
  );
}

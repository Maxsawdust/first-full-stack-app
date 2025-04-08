import "./AddCar.css";
import { FormInput } from "../../components";

export default function AddCar() {
  return (
    <div className="AddCar sub-page">
      <h1 className="page-heading">ADD A CAR TO THE DATABASE</h1>
      <h2 className="page-subheading">PLEASE FILL OUT THE FORM BELOW</h2>

      <form className="add-car-form">
        <div className="input-container">
          <FormInput value="make">ENTER CAR MAKE</FormInput>
          <FormInput value="model">ENTER CAR MODEL</FormInput>
        </div>

        <div className="input-container">
          <FormInput value="registration">ENTER REG NUMBER</FormInput>
          <FormInput value="year">ENTER PROD. YEAR</FormInput>
        </div>

        <div className="price-container">
          <FormInput value="price">ENTER PRICE</FormInput>
        </div>

        <div className="radio-container">
          <p>ARE THERE ANY CURRENT OWNERS?</p>

          <div>
            <input type="radio" name="owners-radio" id="yes-owners" />
            <label htmlFor="yes-owners">YES</label>
          </div>

          <div>
            <input type="radio" name="owners-radio" id="no-owners" checked />
            <label htmlFor="no-owners">NO</label>
          </div>
        </div>
      </form>
    </div>
  );
}

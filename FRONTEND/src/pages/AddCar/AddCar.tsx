import "./AddCar.css";
import { FormInput, AddOwner } from "../../components";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { carValidationSchema } from "../../utils/validationSchema";
import { OwnerType } from "../../interfaces/CarInterface";

export default function AddCar() {
  // state to open and close modal window
  const [ownersModalShown, setOwnersModalShown] = useState(false);
  // state to display added owners
  const [owners, setOwners] = useState<OwnerType[]>([]);

  // using formik for validation
  const formik = useFormik({
    initialValues: {
      make: "",
      model: "",
      registration: "",
      year: "",
      price: "",
    },

    onSubmit: () => {},

    validateOnChange: false,
    validateOnBlur: false,

    validationSchema: Yup.object({
      ...carValidationSchema,
    }),
  });

  return (
    <div className="AddCar sub-page">
      <h1 className="page-heading">ADD A CAR TO THE DATABASE</h1>
      <h2 className="page-subheading">PLEASE FILL OUT THE FORM BELOW</h2>

      <form className="add-car-form" onSubmit={formik.handleSubmit}>
        <div className="input-container">
          <FormInput
            errorMessage={formik.errors.make}
            onChange={formik.handleChange}
            value="make">
            ENTER CAR MAKE
          </FormInput>
          <FormInput
            errorMessage={formik.errors.model}
            onChange={formik.handleChange}
            value="model">
            ENTER CAR MODEL
          </FormInput>
          <FormInput
            errorMessage={formik.errors.registration}
            onChange={formik.handleChange}
            value="registration">
            ENTER REG NUMBER
          </FormInput>

          <FormInput
            errorMessage={formik.errors.year}
            onChange={formik.handleChange}
            value="year">
            ENTER PROD. YEAR
          </FormInput>
          <FormInput
            errorMessage={formik.errors.price}
            onChange={formik.handleChange}
            value="price">
            ENTER PRICE
          </FormInput>
        </div>

        <div className="add-car-owners">
          <div>
            <h2 className="page-subheading">ADD CURRENT OR PREVIOUS OWNERS</h2>
            <button
              type="button"
              className="display-add-owners-modal blue-slide"
              onClick={() => setOwnersModalShown(true)}>
              ADD OWNER
            </button>
          </div>

          <ul className="owners-list">
            {owners.map((owner) => {
              return (
                <div className="owner-details">
                  <p className="owner-name">{`${owner.firstName} ${owner.lastName}`}</p>
                  <p className="owner-address">{owner.address}</p>
                  <p className="owner-status">
                    {owner.isCurrent ? "CURRENT OWNER" : "PREVIOUS OWNER"}
                  </p>
                </div>
              );
            })}
          </ul>
        </div>

        <button className="submit-car-addition blue-slide">ADD CAR</button>
      </form>
      {ownersModalShown ? (
        <AddOwner displayModal={setOwnersModalShown} setOwners={setOwners} />
      ) : null}
    </div>
  );
}

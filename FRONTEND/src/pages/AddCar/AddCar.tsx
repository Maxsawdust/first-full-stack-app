import "./AddCar.css";
import { FormInput, AddOwner, OwnersList } from "../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { carValidationSchema } from "../../utils/validationSchema";
import useOwners from "../../store/hooks/useOwners";
import { useNavigate } from "react-router-dom";
import useCars from "../../store/hooks/useCars";
import useModal from "../../store/hooks/useModal";

export default function AddCar() {
  // state to open and close modal window
  const { addOwnersModalShown, setAddOwnersModalShown } = useModal().addOwners;

  // state to display added owners
  const { owners, setOwners } = useOwners();

  // getting function to refresh DB from hook
  const { refreshCars } = useCars();

  const navigate = useNavigate();

  // using formik for validation
  const formik = useFormik({
    initialValues: {
      make: "",
      model: "",
      registration: "",
      year: "",
      price: "",
    },

    onSubmit: async () => {
      // defining options for fetch method
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...formik.values,
          owners: [
            // getting rid of the temp_id values in the owners array
            ...owners.map((owner) => {
              return {
                firstName: owner.firstName,
                lastName: owner.lastName,
                address: owner.address,
                isCurrent: owner.isCurrent,
              };
            }),
          ],
        }),
      };

      try {
        // trying to make a POST request to DB
        const response = await fetch("http://localhost:5000/cars/", options);
        const data = await response.json();

        // refresh the cars state
        refreshCars();

        // logging success message
        console.log("success", data);

        // reset owners for the next addition
        setOwners([]);

        // navigate to "/" to show added car
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    },

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
              onClick={() => setAddOwnersModalShown(true)}>
              ADD OWNER
            </button>
          </div>

          <OwnersList owners={owners} />
        </div>

        <button className="submit-car-addition blue-slide">ADD CAR</button>
      </form>
      {addOwnersModalShown ? <AddOwner /> : null}
    </div>
  );
}

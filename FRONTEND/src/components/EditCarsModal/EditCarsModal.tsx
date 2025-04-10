import { useFormik } from "formik";
import useModal from "../../store/hooks/useModal";
import useOwners from "../../store/hooks/useOwners";
import FormInput from "../FormInput/FormInput";
import OwnerCard from "../OwnerCard/OwnerCard";
import * as Yup from "yup";
import "./EditCarsModal.css";
import { carValidationSchema } from "../../utils/validationSchema";
import useCars from "../../store/hooks/useCars";

export default function EditCarsModal() {
  const { setCarsModalShown, carToEdit, setCarToEdit } = useModal().editCars;
  const { setAddOwnersModalShown } = useModal().addOwners;
  const { owners, setOwners } = useOwners();
  const { refreshCars } = useCars();

  const car = carToEdit!;

  const formik = useFormik({
    initialValues: {
      make: car.make || "",
      model: car.model || "",
      registration: car.registration || "",
      year: car.year || "",
      price: car.price || "",
    },

    onSubmit: async () => {
      try {
        const updatedCar = {
          ...formik.values,
          owners:
            // getting rid of the temp_id values in the owners array
            owners.map((owner) => {
              return {
                firstName: owner.firstName,
                lastName: owner.lastName,
                address: owner.address,
                isCurrent: owner.isCurrent,
              };
            }) || [],
        };

        console.log(owners);
        const options = {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedCar),
        };

        const response = await fetch(
          `http://localhost:5000/cars/${car._id}`,
          options
        );
        const data = await response.json();
        console.log("Updated: ", data);
        // need to refresh the cars from DB to reflect _id, and date changes
        refreshCars();
        // close modal
        setCarsModalShown(false);
        // clear owners array
        setOwners([]);
        // clear carToEdit
        setCarToEdit(null);
      } catch (err) {
        console.error(err);
      }
    },

    validateOnBlur: false,
    validateOnChange: false,

    validationSchema: Yup.object({
      ...carValidationSchema,
    }),
  });

  return (
    <div className="EditCarsModal">
      <div className="edit-container">
        <h1 className="page-heading">EDIT CAR</h1>
        <button
          className="edit-close-button"
          onClick={() => setCarsModalShown(false)}>
          X
        </button>
        <form className="edit-form" onSubmit={formik.handleSubmit}>
          <div className="edit-car-info">
            <FormInput
              errorMessage={formik.errors.make}
              onChange={formik.handleChange}
              value="make"
              content={formik.values.make}>
              MAKE
            </FormInput>
            <FormInput
              errorMessage={formik.errors.model}
              onChange={formik.handleChange}
              value="model"
              content={formik.values.model}>
              MODEL
            </FormInput>
            <FormInput
              errorMessage={formik.errors.registration}
              onChange={formik.handleChange}
              value="registration"
              content={formik.values.registration}>
              REGISTRATION
            </FormInput>
            <FormInput
              errorMessage={formik.errors.year}
              onChange={formik.handleChange}
              value="year"
              content={formik.values.year}>
              PROD. YEAR
            </FormInput>
            <FormInput
              errorMessage={formik.errors.price}
              onChange={formik.handleChange}
              value="price"
              content={formik.values.price}>
              PRICE
            </FormInput>
          </div>

          <div className="edit-modal-owner-section">
            <div className="owners-container edit-modal-owners-container">
              {owners.map((owner) => {
                return (
                  <OwnerCard
                    hasEditButtons={true}
                    owner={owner}
                    key={owner._id}
                  />
                );
              })}
            </div>
            <div className="edit-cars-buttons">
              <button
                type="button"
                className="blue-slide"
                onClick={() => {
                  setAddOwnersModalShown(true);
                  setCarsModalShown(false);
                }}>
                ADD NEW OWNER
              </button>
              <button type="submit" className="blue-slide submit-edit-button">
                SUBMIT EDITS
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

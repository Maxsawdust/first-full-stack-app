import "./AddOwner.css";
import { FormInput } from "../";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ownerValidationSchema } from "../../utils/validationSchema";
import { OwnerType } from "../../interfaces/CarInterface";
import useOwners from "../../store/hooks/useOwners";
import useModal from "../../store/hooks/useModal";
import { useLocation } from "react-router-dom";

export default function AddOwner() {
  // getting owners state variables from custom hook and context
  const { owners, setOwners } = useOwners();

  const { setAddOwnersModalShown } = useModal().addOwners;

  const { setCarsModalShown } = useModal().editCars;

  const location = useLocation();

  const handleClose = () => {
    if (location.pathname === "/") {
      setCarsModalShown(true);
    }
    setAddOwnersModalShown(false);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      isCurrent: "",
    },

    onSubmit: () => {
      let updatedOwners = owners;
      // if the submitted owner isCurrent
      if (formik.values.isCurrent) {
        // make sure all other owners in the array are now previous
        updatedOwners = owners.map((owner) => {
          return {
            ...owner,
            isCurrent: false,
          };
        });
        setOwners([...updatedOwners]);
        console.log(owners);
      }

      // temporary _id value (will get changed when added to DB)
      const temp_id = owners.length + 1;

      // create variable to store owner data
      const ownerData: OwnerType = {
        ...formik.values,
        // making sure that isCurrent is a bool
        isCurrent: formik.values.isCurrent === "true",
        _id: temp_id.toString(),
      };
      // set the state to display the owners in parent component
      setOwners([...updatedOwners, ownerData]);

      // show EditCarsModal if needed
      if (location.pathname === "/") {
        setCarsModalShown(true);
      }

      // close the modal
      setAddOwnersModalShown(false);
    },

    validateOnBlur: false,
    validateOnChange: false,

    validationSchema: Yup.object({
      ...ownerValidationSchema,
    }),
  });

  return (
    <div className="AddOwner">
      <div className="owner-modal">
        <h2 className="page-subheading">ADD OWNER</h2>

        <button className="owners-close-button" onClick={handleClose}>
          X
        </button>

        <form className="add-owner-form" onSubmit={formik.handleSubmit}>
          <div className="owner-detail-inputs">
            <FormInput
              errorMessage={formik.errors.firstName}
              onChange={formik.handleChange}
              value="firstName">
              FIRST NAME
            </FormInput>
            <FormInput
              errorMessage={formik.errors.lastName}
              onChange={formik.handleChange}
              value="lastName">
              LAST NAME
            </FormInput>
          </div>

          <div className="owner-address-input">
            <FormInput
              errorMessage={formik.errors.address}
              onChange={formik.handleChange}
              value="address">
              ADDRESS
            </FormInput>
          </div>

          <div className="isCurrent-radios">
            <p>IS THIS PERSON THE CURRENT OWNER?</p>
            <div>
              <label className="isCurrent-label">
                <input
                  type="radio"
                  name="isCurrent"
                  value="true"
                  onChange={formik.handleChange}
                />
                YES
              </label>

              <label className="isCurrent-label">
                <input
                  type="radio"
                  name="isCurrent"
                  value="false"
                  onChange={formik.handleChange}
                />
                NO
              </label>
            </div>
            {formik.errors.isCurrent && (
              <p className="input-error">{formik.errors.isCurrent}</p>
            )}
          </div>

          <button type="submit" className="add-owner-button">
            ADD OWNER
          </button>
        </form>
      </div>
    </div>
  );
}

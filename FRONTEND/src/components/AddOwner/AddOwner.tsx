import "./AddOwner.css";
import { FormInput } from "../";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ownerValidationSchema } from "../../utils/validationSchema";
import { OwnerType } from "../../interfaces/CarInterface";
import useOwners from "../../store/hooks/useOwners";

// type for props
type AddOwnerType = {
  displayModal: (value: boolean) => void;
};

export default function AddOwner({ displayModal }: AddOwnerType) {
  // getting owners state variables from custom hook and context
  const { owners, setOwners } = useOwners();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      isCurrent: "",
    },

    onSubmit: () => {
      // if the submitted owner isCurrent
      if (formik.values.isCurrent) {
        // make sure all other owners in the array are now previous
        const updatedOwners = owners.map((owner) => {
          return {
            ...owner,
            isCurrent: false,
          };
        });
        setOwners([...updatedOwners]);
      }

      // create variable to store owner data
      const ownerData: OwnerType = {
        ...formik.values,
        // making sure that isCurrent is a bool
        isCurrent: formik.values.isCurrent === "true",
      };
      // set the state to display the owners in parent component
      setOwners((prev: OwnerType[]) => [...prev, ownerData]);

      // close the modal
      displayModal(false);
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

        <button
          className="owners-close-button"
          onClick={() => displayModal(false)}>
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

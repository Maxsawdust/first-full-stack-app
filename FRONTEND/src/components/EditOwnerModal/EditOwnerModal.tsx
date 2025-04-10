import { OwnerType } from "../../interfaces/CarInterface";
import { FormInput } from "../";
import useModal from "../../store/hooks/useModal";
import "./EditOwnerModal.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ownerValidationSchema } from "../../utils/validationSchema";
import useOwners from "../../store/hooks/useOwners";

type EditOwnerModalProps = {
  owner: OwnerType | null;
};

export default function EditOwnerModal({ owner }: EditOwnerModalProps) {
  const { setOwnersModalShown } = useModal().editOwners;
  const { owners, setOwners } = useOwners();

  const formik = useFormik({
    initialValues: {
      firstName: owner?.firstName || "",
      lastName: owner?.lastName || "",
      address: owner?.address || "",
      isCurrent: owner?.isCurrent || false,
    },

    onSubmit: () => {
      const updatedOwner = { ...owner, ...formik.values };
      setOwners([...owners.filter((o) => o._id !== owner?._id), updatedOwner]);

      // close the modal
      setOwnersModalShown(false);
    },

    validateOnBlur: false,
    validateOnChange: false,

    validationSchema: Yup.object({
      ...ownerValidationSchema,
    }),
  });

  return (
    <div className="EditOwnerModal">
      <div className="edit-container owners-edit-container">
        <h1 className="page-heading">EDIT OWNER</h1>
        <button
          className="edit-close-button"
          onClick={() => setOwnersModalShown(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>

        <form className="edit-form" onSubmit={formik.handleSubmit}>
          <div className="edit-owner-info">
            <FormInput
              content={formik.values.firstName}
              errorMessage={formik.errors.firstName}
              onChange={formik.handleChange}
              value="firstName">
              FIRST NAME
            </FormInput>
            <FormInput
              content={formik.values.lastName}
              errorMessage={formik.errors.lastName}
              onChange={formik.handleChange}
              value="lastName">
              LAST NAME
            </FormInput>
          </div>
          <div className="edit-owner-address">
            <FormInput
              content={formik.values.address}
              errorMessage={formik.errors.address}
              onChange={formik.handleChange}
              value="address">
              ADDRESS
            </FormInput>
          </div>

          <button className="submit-owner-changes blue-slide">
            SUBMIT CHANGES
          </button>
        </form>
      </div>
    </div>
  );
}

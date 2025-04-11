import { useFormik } from "formik";
import { CarCard, FormInput, OwnerCard } from "../../components";
import useCars from "../../store/hooks/useCars";
import "./UpdateCars.css";
import { useState } from "react";
import * as Yup from "yup";
import { carValidationSchema } from "../../utils/validationSchema";
import useOwners from "../../store/hooks/useOwners";
import useModal from "../../store/hooks/useModal";
import { useNavigate } from "react-router-dom";

export default function UpdateCars() {
  const { cars } = useCars();
  // creating a state to store the current selected make
  const [selectedMake, setSelectedMake] = useState("");
  // creating a state to store models for selected make
  const [models, setModels] = useState<string[]>([]);
  // creating a state to store the selected model
  const [selectedModel, setSelectedModel] = useState("");

  const { owners, setOwners } = useOwners();
  const { setAddOwnersModalShown } = useModal().addOwners;
  const { refreshCars } = useCars();

  const navigate = useNavigate();

  // spreading a new Set into an array in order to store only unique makes of the cars
  const makes = [...new Set(cars.map((car) => car.make))];

  const setMake = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(e.target.value);
    // spreading another Set into an array to store each unique model of the selected make
    const models = [
      ...new Set(
        cars
          .filter((car) => car.make === e.target.value)
          .map((car) => car.model)
      ),
    ];
    setModels(models);
    // clearing selected model
    setSelectedModel("");
  };
  // creating an array of cars of which the make and model make the selected make and model
  const carsToEdit = cars.filter(
    (car) => car.make === selectedMake && car.model === selectedModel
  );

  const formik = useFormik({
    initialValues: {
      price: "",
    },

    onSubmit: async () => {
      try {
        const requestBody =
          owners.length > 0
            ? {
                owners: owners,
                price: formik.values.price,
              }
            : {
                price: formik.values.price,
              };

        const options = {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(requestBody),
        };

        const response = await fetch(
          `http://localhost:5000/cars?make=${selectedMake}&model=${selectedModel}`,
          options
        );
        const data = await response.json();

        console.log("success ", data);
        // clear owners
        setOwners([]);
        // navigate to "/"
        navigate("/");
        // refreshCars
        refreshCars();
      } catch (err) {
        console.error(err);
      }
    },

    validateOnBlur: false,
    validateOnChange: false,

    validationSchema: Yup.object({
      price: carValidationSchema.price,
    }),
  });

  return (
    <div className="UpdateCars sub-page">
      <h1 className="page-heading">SELECT A MAKE AND MODEL TO EDIT</h1>
      <div className="make-model-selects">
        <select name="make" onChange={setMake}>
          <option selected value="make">
            MAKE
          </option>
          {/* mapping through makes array to display options */}
          {makes.map((make) => {
            return (
              <option key={make} value={make}>
                {make.toUpperCase()}
              </option>
            );
          })}
        </select>

        {/* This select is disabled until there are models in the models array */}
        <select
          disabled={models.length === 0 && true}
          name="model"
          onChange={(e) => setSelectedModel(e.target.value)}>
          <option selected value="model">
            MODEL
          </option>
          {/* mapping through models to display option elements */}
          {models.map((model) => {
            return (
              <option key={model} value={model}>
                {model.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>

      <div
        className="selected-cars-container"
        style={
          carsToEdit.length === 0
            ? {
                backgroundColor: "var(--primary-color)",
                justifyContent: "center",
                alignItems: "center",
              }
            : { backgroundColor: "var(--tertiary-color" }
        }>
        {carsToEdit.map((car) => {
          return <CarCard readOnly car={car} />;
        })}
        {carsToEdit.length === 0 && (
          <h2 className="page-subheading">
            CARS OF SELECTED MAKE AND MODEL WILL APPEAR HERE
          </h2>
        )}
      </div>

      {carsToEdit.length > 0 && (
        <form className="bulk-edit-form" onSubmit={formik.handleSubmit}>
          <div>
            <FormInput
              errorMessage={formik.errors.price}
              value="price"
              onChange={formik.handleChange}
              content={formik.values.price}>
              NEW PRICE
            </FormInput>

            <button
              onClick={() => {
                setAddOwnersModalShown(true);
              }}
              type="button"
              className="bulk-edit-add-owners blue-slide">
              ADD NEW OWNER
            </button>
          </div>

          <div className="bulk-edit-owners-container">
            {owners.map((owner) => {
              return <OwnerCard owner={owner} />;
            })}
          </div>

          <button type="submit" className="blue-slide bulk-edit-submit">
            SUBMIT EDIT
          </button>
        </form>
      )}
    </div>
  );
}

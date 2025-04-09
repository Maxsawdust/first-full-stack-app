import * as Yup from "yup";

export const carValidationSchema = {
  make: Yup.string()
    // all fields use required() so that they always get submitted
    .required("MAKE IS REQUIRED")
    // must only contain letters and hyphens
    .matches(/^[a-z]+(?:-[a-z]+)*$/i, "PLEASE ENTER A VALID MAKE")
    // must be less than or equal to 13 chars
    .max(13, "MAKE NAME IS TOO LONG"),

  model: Yup.string()
    .required("MODEL IS REQUIRED")
    .matches(/^[a-z]+(?:-[a-z]+)*$/i, "PLEASE ENTER A VALID MODEL")
    // must be less than or equal to 22 chars
    .max(22, "MODEL NAME IS TOO LONG"),

  registration: Yup.string()
    .required("REGISTRATION IS REQUIRED")
    .matches(/^[a-z0-9]+$/i, "PLEASE ENTER A VALID REGISTRATION")
    // the longest registrations are only 10 chars
    .max(10, "PLEASE ENTER A VALID REGISTRATION"),

  year: Yup.number()
    .required("YEAR IS REQUIRED")
    // year must be positive and an integer
    .positive("PLEASE ENTER A VALID YEAR")
    .integer("PLEASE ENTER A VALID YEAR")
    // first car was made in 1886
    .min(1886, "PLEASE ENTER A VALID YEAR")
    // car can't be made in the future
    .max(new Date().getFullYear(), "PLEASE ENTER A VALID DATE"),

  price: Yup.number()
    .required("PRICE IS REQUIRED")
    .positive("PLEASE ENTER A VALID PRICE")
    // rounding the number to 2D.P
    .transform((value) => parseFloat(value.toFixed(2))),
};

// separate schema for owners
export const ownerValidationSchema = {
  firstName: Yup.string()
    .required("FIRST NAME IS REQUIRED")
    .matches(/^[a-z]+$/i, "PLEASE ENTER A VALID NAME")
    .max(20, "NAME IS TOO LONG"),

  lastName: Yup.string()
    .required("LAST NAME IS REQUIRED")
    .matches(/^[a-z]+$/i, "PLEASE ENTER A VALID NAME")
    .max(20, "NAME IS TOO LONG"),

  address: Yup.string()
    .required("ADDRESS IS REQUIRED")
    .matches(/^[a-z0-9\s,]+$/i, "PLEASE ENTER A VALID ADDRESS"),

  isCurrent: Yup.string().required("PLEASE SELECT AN OPTION"),
};

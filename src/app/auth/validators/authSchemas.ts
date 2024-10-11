import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  first_name: yup.string().required("Required field").min(2, "Min 2 symbols"),
  last_name: yup.string().required("Required field").min(2, "Min 2 symbols"),
  email: yup.string().required("Required field!").email(),
  password: yup
    .string()
    .required("Required field")
    .min(1, "Min 1 symbol")
    .matches(/^[0-9a-zA-Z]{1,}$/, "Password incorrect"),
});

export const signInSchema = yup.object().shape({
  email: yup.string().required("Required field!").email(),
  password: yup
    .string()
    .required("Required field")
    .min(1, "Min 1 symbol")
    .matches(/^[0-9a-zA-Z]{1,}$/, "Password incorrect"),
});
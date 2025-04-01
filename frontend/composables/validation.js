import * as yup from "yup";

export const useLoginValidationSchema = () =>
  yup.object({
    username: yup.string().required().label("Username"),
    password: yup.string().required().label("Password"),
  });

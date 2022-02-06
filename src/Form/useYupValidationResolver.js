import { useCallback } from "react";
import * as yup from "yup";

yup.addMethod(yup.array, "arrayNumber", function (errorMessage) {
  return this.test(`array-number`, errorMessage, function (value) {
    const { path, createError } = this;

    return value.length > 0 || createError({ path, message: errorMessage });
  });
});
export const validationSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  sex: yup.string().required("Required"),
  description: yup.string().required("Required"),
  detialDescription: yup.string().required("Required"),
  color: yup.string().required("Required"),
  food: yup.array().arrayNumber("Required at least one food iteam"),
  nested: yup.array().of(
    yup.object({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      sex: yup.string().required("Required"),
      description: yup.string().required("Required"),
      color: yup.string().required("Required"),
      food: yup.array().arrayNumber("Required at least one food iteam"),
      nested2: yup.array().of(
        yup.object({
          firstName: yup.string().required("Required"),
          lastName: yup.string().required("Required"),
          sex: yup.string().required("Required"),
          description: yup.string().required("Required"),
          color: yup.string().required("Required"),
          food: yup.array().arrayNumber("Required at least one food iteam")
        })
      )
    })
  )
});
const useYupValidationResolver = (validationSchema) => {
  return useCallback(
    async (data) => {
      //console.log("data", data);
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path.replaceAll("[", ".").replaceAll("]", "")]: {
                type: currentError.type ?? "validation",
                message: currentError.message
              }
            }),
            {}
          )
        };
      }
    },
    [validationSchema]
  );
};
export default useYupValidationResolver;

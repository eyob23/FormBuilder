import React from "react";
import Form from "./Form";
import useYupValidationResolver, {
  validationSchema
} from "./Form/useYupValidationResolver";
import { dataSchema, data } from "./TestForm/formData";

export default function App() {
  const onSubmit = (data: FormData) => console.log(data);
  const numberOfForms = 50;
  return (
    <div style={{ margin: "2rem" }}>
      <h1>Form Builder from JSON</h1>
      {[...Array(numberOfForms)].map((e, i) => (
        <Form
          key={i.toString()}
          id={`form-${i + 1}`}
          onSubmit={onSubmit}
          dataSchema={dataSchema}
          defaultValues={data}
          validationSchema={validationSchema}
          useValidationResolver={useYupValidationResolver}
        />
      ))}
    </div>
  );
}

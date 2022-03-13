import React from "react";
import { useController } from "react-hook-form";
import { Input, FormGroup, FormFeedback, FormText, Label } from "reactstrap";
export default function EcInput(props) {
  const {
    methods: { control },
    schema,
    ...rest
  } = props;
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields, isSubmitted }
  } = useController({
    name: schema.name,
    control
  });
  if (rest.readOnly) {
    return (
      <div>
        {schema.label}: {value}
      </div>
    );
  }
  // if (Math.random() > 0.5) {
  //   console.log("I was here");
  //   throw new Error("random error message for testing error handling!");
  // }
  return (
    <>
      <FormGroup>
        <Label htmlFor={name}>{schema.label}</Label>
        <Input
          onChange={onChange} // send value to hook form
          onBlur={onBlur} // notify when input is touched/blur
          value={value || ""} // input value
          name={name} // send down the input name
          innerRef={ref} // send input ref, so we can focus on input when error appear
          {...rest}
          invalid={invalid}
          valid={!invalid && isSubmitted}
        />
        <FormFeedback tooltip valid style={{ position: "static" }}>
          Sweet! that name is available
        </FormFeedback>
        <FormFeedback tooltip style={{ position: "static" }}>
          Oh noes! that name is already taken!
        </FormFeedback>
        <FormText>Example help text that remains unchanged.</FormText>
      </FormGroup>
    </>
  );
}

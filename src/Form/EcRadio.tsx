import React from "react";
import { useController } from "react-hook-form";
import { Input, FormGroup, FormFeedback, FormText, Label } from "reactstrap";
export default function EcRadio(props:any) {
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
  return (
    <>
      <FormGroup tag="fieldset">
        <legend className="fs-6">{schema.label}</legend>
        {schema.option.map((opt:any) => (
          <FormGroup check key={"radio-" + opt} inline>
            <Label htmlFor={name} check>
              {opt}
            </Label>
            <Input
              type={schema.type}
              checked={value === opt}
              onChange={onChange} // send value to hook form
              onBlur={onBlur} // notify when input is touched/blur
              value={opt} // input value
              name={name} // send down the input name
              innerRef={ref} // send input ref, so we can focus on input when error appear
              {...rest}
              invalid={invalid}
              valid={!invalid && isSubmitted}
            />
          </FormGroup>
        ))}
        <div
          className={invalid ? "is-invalid" : isSubmitted ? "is-valid" : undefined}
        ></div>
        <FormFeedback tooltip valid style={{ position: "static" }}>
          Sweet!
        </FormFeedback>
        <FormFeedback tooltip style={{ position: "static" }}>
          Oh noes!
        </FormFeedback>
        <FormText>Example help text that remains unchanged.</FormText>
      </FormGroup>
    </>
  );
}

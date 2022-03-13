import React from "react";
import { useController } from "react-hook-form";
import { Input, FormGroup, FormFeedback, FormText, Label } from "reactstrap";
export default function EcCheckBox(props) {
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
        {schema.label}: {value?.join(", ")}
      </div>
    );
  }

  if (schema.condition) {
  }
  return (
    <>
      <FormGroup tag="fieldset">
        <legend className="fs-6">{schema.label}</legend>
        {schema.option.map((opt) => (
          <FormGroup check key={"check-" + opt} inline>
            <Label htmlFor={name} check>
              {opt}
            </Label>
            <Input
              type={schema.type}
              // checked={value === o}
              checked={value?.includes(opt)}
              //onChange={onChange} // send value to hook form
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([
                    ...new Set([...value, e.target.value, e.target.value])
                  ]);
                } else {
                  onChange(value.filter((v) => v !== e.target.value));
                }
              }}
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
          className={invalid ? "is-invalid" : isSubmitted ? "is-valid" : null}
        ></div>
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

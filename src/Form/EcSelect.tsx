import { useController } from "react-hook-form";
import { Input, FormGroup, FormFeedback, FormText, Label } from "reactstrap";
export default function EcSelect(props) {
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
    <FormGroup>
      <Label htmlFor={name}>{schema.label}</Label>
      <Input
        type={schema.type}
        onChange={onChange} // send value to hook form
        onBlur={onBlur} // notify when input is touched/blur
        value={value || ""} // input value
        name={name} // send down the input name
        innerRef={ref} // send input ref, so we can focus on input when error appear
        {...rest}
        invalid={invalid}
        valid={!invalid && isSubmitted}
      >
        {schema.option.map((opt) => (
          <option key={"select-" + opt}>{opt}</option>
        ))}
      </Input>
      <FormFeedback tooltip valid style={{ position: "static" }}>
        Sweet!
      </FormFeedback>
      <FormFeedback tooltip style={{ position: "static" }}>
        Oh noes!
      </FormFeedback>
      <FormText>Example help text that remains unchanged.</FormText>
    </FormGroup>
  );
}

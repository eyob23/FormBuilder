import React, { useEffect, useState } from "react";
import {
  useForm,
  useController,
  useFieldArray,
  useWatch,
  get
} from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { ErrorMessage } from "@hookform/error-message";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ErrorBoundary from "../ErrorBoundary";
import {
  Input,
  Row,
  Col,
  FormGroup,
  FormFeedback,
  FormText,
  Label,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle
} from "reactstrap";
export function EcErrorCounter({ resolver, control }) {
  const [count, setCount] = useState(0);
  const data = useWatch({
    control
  });
  useEffect(() => {
    resolver(data).then((e) => {
      setCount(Object.keys(e.errors).length | 0);
      // console.log({
      //   values: e.values,
      //   errors: e.errors,
      //   errorCount: Object.keys(e.errors).length | 0
      // });
    });
  }, [data, resolver]);
  return (
    <>
      <div>validation error count {count}</div>
      <div>
        <pre>{JSON.stringify(data, null, 1)}</pre>
      </div>
    </>
  );
}
export function FormState({ reset, control, formState }) {
  const data = useWatch({
    control
  });
  const {
    isDirty,
    isValid,
    dirtyFields,
    isSubmitted,
    isSubmitSuccessful,
    submitCount
  } = formState;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(data, {
        keepErrors: false,
        keepDirty: false,
        keepIsSubmitted: true,
        keepTouched: false,
        keepIsValid: true,
        keepSubmitCount: true
      });
    }
  }, [submitCount, isSubmitSuccessful]);
  return (
    <>
      <div>
        <div>DirtyFields</div>
        <pre>{JSON.stringify(dirtyFields, null, 1)}</pre>
        <div>IsDirty</div>
        <pre>{JSON.stringify(isDirty, null, 1)}</pre>
        <div>IsValid</div>
        <pre>{JSON.stringify(isValid, null, 1)}</pre>
        <div>IsSubmitSuccessful</div>
        <pre>{JSON.stringify(isSubmitSuccessful, null, 1)}</pre>
        <div>SubmitCount</div>
        <pre>{JSON.stringify(submitCount, null, 1)}</pre>
      </div>
    </>
  );
}
export default function EcForm({
  defaultValues,
  children,
  onSubmit,
  dataSchema,
  useValidationResolver,
  validationSchema
}) {
  const resolver = useValidationResolver(validationSchema);
  const methods = useForm({
    defaultValues,
    resolver
  });
  const { handleSubmit, control } = methods;
  const [disabled, setIsDisabled] = useState(null);
  const [readOnly, setReadonly] = useState(null);
  return (
    <>
      <button type="button" onClick={() => setIsDisabled(!disabled)}>
        Taggle disabled {disabled ? "Disabled" : "Enabled"}
      </button>
      <button type="button" onClick={() => setReadonly(!readOnly)}>
        Taggle read/Edit mode {readOnly ? "Readonly mode" : "Edit mode"}
      </button>
      <Row>
        <Col className="bg-light border">
          <form onSubmit={handleSubmit(onSubmit)}>
            <EcFields
              dataSchema={dataSchema}
              methods={methods}
              disabled={disabled}
              readOnly={readOnly}
            />
            <Button color="primary">Click Me</Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Col>
        <Col className="bg-light border">
          <FormState {...methods} />
          <EcErrorCounter resolver={resolver} control={control} />
        </Col>
      </Row>

      {/* <DevTool control={control} /> */}
    </>
  );
}
export const EcFields = (props) => {
  const { dataSchema, ...rest } = props;
  return (
    <>
      {dataSchema.map((schema) => (
        <div key={schema.name} style={{ marginBottom: "1rem" }}>
          {/* <div>
            <label htmlFor={schema.name}>{schema.label}</label>
          </div> */}
          <EcField schema={schema} {...rest} />
        </div>
      ))}
    </>
  );
};
export const EcField = (props) => {
  const {
    schema: { type, name, label },
    methods: { formState }
  } = props;
  const { errors } = formState;
  const renderFieldType = () => {
    switch (type) {
      case "select":
        return <EcSelect {...props} />;
      case "checkbox":
        return <EcCheckBox {...props} />;
      case "listOfFieldItems":
        return <EcFieldArray {...props} />;
      case "object":
        return <EcFieldObject {...props} />;
      case "editor":
        return <EcEditor {...props} />;
      case "radio":
        return <EcRadio {...props} />;
      case "text":
        return <EcInput {...props} />;
      case "textArea":
        return <EcInput {...props} />;
      default:
        return <div key={"default"}>invalid form type {type}</div>;
    }
  };
  const CustomProps = get(errors, name)
    ? { style: { border: "3px solid red" }, className: "FieldWithError" }
    : null;
  return (
    <>
      <div {...CustomProps}>{renderFieldType()}</div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p>error:{message || `"${label} is required."`}</p>
        )}
      />
    </>
  );
};
export function EcInput(props) {
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
      <div>
        I'm an input type {schema.type} and mod is {rest?.readonly?.toString()}
      </div>
      <FormGroup>
        <Label htmlFor={name}>{schema.label}</Label>
        <Input
          onChange={onChange} // send value to hook form
          onBlur={onBlur} // notify when input is touched/blur
          value={value} // input value
          name={name} // send down the input name
          innerRef={ref} // send input ref, so we can focus on input when error appear
          {...rest}
          invalid={invalid}
          valid={!invalid && isSubmitted}
        />
        <FormFeedback tooltip valid style={{ position: "static" }}>
          Sweet! that name is available
        </FormFeedback>
        <FormFeedback tooltip invalid style={{ position: "static" }}>
          Oh noes! that name is already taken!
        </FormFeedback>
        <FormText>Example help text that remains unchanged.</FormText>
      </FormGroup>
    </>
  );
}

export function EcSelect(props) {
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
        value={value} // input value
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
        Sweet! that name is available
      </FormFeedback>
      <FormFeedback tooltip invalid style={{ position: "static" }}>
        Oh noes! that name is already taken!
      </FormFeedback>
      <FormText>Example help text that remains unchanged.</FormText>
    </FormGroup>
  );
}
export function EcCheckBox(props) {
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
      <div>I'm an input type {schema.type}</div>
      <FormGroup tag="fieldset">
        <legend className="fs-6">{schema.label}</legend>
        {schema.option.map((opt) => (
          <FormGroup check>
            <Label htmlFor={name} check>
              {opt}
            </Label>
            <Input
              key={"check-" + opt}
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
        <FormFeedback tooltip invalid style={{ position: "static" }}>
          Oh noes! that name is already taken!
        </FormFeedback>
        <FormText>Example help text that remains unchanged.</FormText>
      </FormGroup>
    </>
  );
}
export function EcRadio(props) {
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
      <div>I'm an input type {schema.type}</div>
      <FormGroup tag="fieldset">
        <legend className="fs-6">{schema.label}</legend>
        {schema.option.map((opt) => (
          <FormGroup check>
            <Label htmlFor={name} check>
              {opt}
            </Label>
            <Input
              key={"radio-" + opt}
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
          className={invalid ? "is-invalid" : isSubmitted ? "is-valid" : null}
        ></div>
        <FormFeedback tooltip valid style={{ position: "static" }}>
          Sweet! that name is available
        </FormFeedback>
        <FormFeedback tooltip invalid style={{ position: "static" }}>
          Oh noes! that name is already taken!
        </FormFeedback>
        <FormText>Example help text that remains unchanged.</FormText>
      </FormGroup>
    </>
  );
}
export function EcEditor(props) {
  const {
    methods: { control },
    schema: { name, label },
    disabled,
    ...rest
  } = props;
  const { field } = useController({
    name,
    control
  });
  if (rest.readOnly) {
    return (
      <div>
        {label}: {field.value}
      </div>
    );
  }
  return (
    <CKEditor
      editor={ClassicEditor}
      data={field.value}
      id={name}
      disabled={disabled}
      onReady={(editor) => {
        // editor.disabled  = disabled ;
        editor.editing.view.change((writer) => {
          writer.setStyle(
            "height",
            "200px",
            editor.editing.view.document.getRoot()
          );
        });
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        field.onChange(data);
      }}
    />
  );
}
export function EcFieldArray(props) {
  const {
    methods: { control },
    schema: { name, label, listOfFieldItems },

    ...rest
  } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });
  return (
    <Card>
      <CardBody>
        <CardTitle className="display-2">{label}</CardTitle>
        <CardSubtitle className="mb-2 text-muted">{`You can add more ${label} by clicking the add button`}</CardSubtitle>
        {fields.map((item, index) => (
          <CardText key={item.id}>
            <EcFields
              dataSchema={listOfFieldItems?.map((schema) => ({
                ...schema,
                name: `${name}.${index}.${schema.name}`
              }))}
              methods={props.methods}
              {...rest}
            />
            <Button type="danger" onClick={() => remove(index)}>
              Delete {name}
            </Button>
          </CardText>
        ))}
        <Button
          type="default"
          onClick={() =>
            append({
              firstName: "smith nested23",
              lastName: "Joe nested23",
              sex: "male",
              description: "initial Description  nested23",
              food: ["salad", "pasta"],
              color: "blue",
              detialDescription: "This is more information  nested23",
              fullName: {
                firstName: "object first name3",
                lastName: "object last name3"
              }
            })
          }
        >
          Add new {name}
        </Button>
      </CardBody>
    </Card>
  );
}
export function EcFieldObject(props) {
  const {
    schema: { name, label, listOfFieldItems },
    ...rest
  } = props;
  return (
    <Card>
      <CardBody>
        <CardTitle>{label}</CardTitle>
        <EcFields
          dataSchema={listOfFieldItems?.map((schema) => ({
            ...schema,
            name: `${name}.${schema.name}`
          }))}
          {...rest}
        />
      </CardBody>
    </Card>
  );
}

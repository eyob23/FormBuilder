import React, { useEffect, useState } from "react";
import {
  useForm,
  useController,
  useFieldArray,
  useWatch,
  get
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export function ErrorCounter({ resolver, data }) {
  const [count, setCount] = useState(0);
  const getErrorCount = (data) => {
    resolver(data).then((e) => {
      setCount(Object.keys(e.errors).length | 0);
      console.log({
        values: e.values,
        errors: e.errors,
        errorCount: Object.keys(e.errors).length | 0
      });
    });
  };
  useEffect(() => {
    getErrorCount(data);
  }, [data]);
  return <div>Error count {count}</div>;
}
export default function Form({
  defaultValues,
  children,
  onSubmit,
  dataSchema,
  useYupValidationResolver,
  validationSchema
}) {
  const resolver = useYupValidationResolver(validationSchema);
  // const { handleSubmit, register } = useForm({ resolver });
  const { handleSubmit, register, control, formState } = useForm({
    defaultValues,
    resolver
  });
  const watchAll = useWatch({
    control
  });
  //error from RHF
  console.log(formState.errors);
  //error count info outside of RHF(manual check data and error)
  // resolver(watchAll).then((e) =>
  //   console.log({
  //     values: e.values,
  //     errors: e.errors,
  //     errorCount: Object.keys(e.errors).length | 0
  //   })
  // );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <pre>{JSON.stringify(watchAll, null, 2)}</pre>
      </div>
      <ErrorCounter resolver={resolver} data={watchAll} />
      <Fields
        dataSchema={dataSchema}
        register={register}
        control={control}
        formState={formState}
      />
      <button>Submit</button>
    </form>
  );
}
export const Fields = ({ dataSchema, register, control, formState }) => {
  return (
    <>
      {dataSchema.map((schema) => (
        <div key={schema.name} style={{ marginBottom: "1rem" }}>
          <div>
            <label htmlFor={schema.name}>{schema.label}</label>
          </div>
          <Field
            schema={schema}
            register={register}
            control={control}
            formState={formState}
          />
        </div>
      ))}
    </>
  );
};
export const Field = (props) => {
  const { schema, control, formState } = props;
  const register = props.register(schema.name, {
    required: `${schema.label} is required.`
  });
  const { errors } = formState;
  const renderFieldType = () => {
    switch (schema.type) {
      case "select":
        return (
          <Select
            register={register}
            name={schema.name}
            options={schema.option}
          />
        );
      case "checkbox":
        return (
          <CheckBox
            register={register}
            name={schema.name}
            options={schema.option}
            control={control}
          />
        );
      case "array":
        return (
          <FieldArray
            register={props.register}
            name={schema.name}
            options={schema.option}
            array={schema.array}
            control={control}
            formState={formState}
          />
        );
      case "editor":
        return (
          <Editor
            register={register}
            name={schema.name}
            options={schema.option}
            control={control}
          />
        );
      case "radio":
        return (
          <Radio
            register={register}
            name={schema.name}
            options={schema.option}
            control={control}
          />
        );
      case "text":
        return <Input register={register} name={schema.name} />;
      case "textArea":
        return <TextArea register={register} name={schema.name} />;
      default:
        return <div key={"default"}>invalid form type {schema.type}</div>;
    }
  };
  const style = get(errors, schema.name)
    ? { border: "3px solid red", display: "inline-block" }
    : null;
  return (
    <>
      <div style={{ ...style }}>
        {/* {console.log(`${schema.name}`, errors[`${schema.name}`], style)} */}
        {renderFieldType()}
      </div>
      <ErrorMessage
        errors={errors}
        name={schema.name}
        render={({ message }) => (
          <p>error:{message || `"${schema.label} is required."`}</p>
        )}
      />
    </>
  );
};
export function Input({ register, name, ...rest }) {
  return <input {...register} {...rest} />;
}
export function TextArea({ register, name, ...rest }) {
  return <textarea {...register} {...rest} cols={50} rows={10} />;
}

export function Select({ register, options, name, ...rest }) {
  return (
    <select {...register} {...rest}>
      {options.map((value) => (
        <option key={"select-" + value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
export function CheckBox({ register, options, name, control, ...rest }) {
  return options.map((option) => (
    <div key={"select-" + option}>
      <input type="checkbox" {...register} {...rest} value={option} />
      <label htmlFor={option}>{option}</label>
    </div>
  ));
}
export function Radio({ register, options, name, control, ...rest }) {
  return options.map((option) => (
    <div key={"radio-" + option}>
      <input type="radio" {...register} {...rest} value={option} />
      <label htmlFor={option}>{option}</label>
    </div>
  ));
}
export function Editor({ register, options, name, control, ...rest }) {
  const { field } = useController({
    name,
    control
  });
  return (
    <CKEditor
      editor={ClassicEditor}
      data={field.value}
      onReady={(editor) => {
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
export function FieldArray({
  register,
  options,
  name,
  control,
  array,
  formState,
  ...rest
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });

  return (
    <div style={{ padding: "1rem" }}>
      <div
        style={{ border: "1px solid black", padding: "1rem", margin: "1rem" }}
      >
        {fields.map((item, index) => (
          <div key={item.id}>
            <Fields
              dataSchema={array.map((schema) => ({
                ...schema,
                name: `${name}.${index}.${schema.name}`
              }))}
              register={register}
              control={control}
              formState={formState}
            />
            <button type="button" onClick={() => remove(index)}>
              Delete {name}
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => append({ firstName: "bill", lastName: "luo" })}
      >
        Add new {name}
      </button>
    </div>
  );
}

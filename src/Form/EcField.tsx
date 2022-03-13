import EcSelect from "./EcSelect";
import EcCheckBox from "./EcCheckBox";
import EcFieldArray from "./EcFieldArray";
import EcFieldObject from "./EcFieldObject";
import EcEditor from "./EcEditor";
import EcRadio from "./EcRadio";
import EcInput from "./EcInput";
import WithConditional from "./WithConditional";
import WithTagging from "./WithTagging";
import { ErrorMessage } from "@hookform/error-message";
import { get } from "react-hook-form";
export default function EcField(props: any) {
  const {
    schema: { type, name, label, condition, taggleable },
    methods: { formState }
  } = props;
  const { errors } = formState;
  const renderFieldType = () => {
    let ShowField;
    switch (type) {
      case "select":
        ShowField = <EcSelect {...props} />;
        break;
      case "checkbox":
        ShowField = <EcCheckBox {...props} />;
        break;
      case "listOfFieldItems":
        ShowField = <EcFieldArray {...props} />;
        break;
      case "object":
        ShowField = <EcFieldObject {...props} />;
        break;
      case "editor":
        ShowField = <EcEditor {...props} />;
        break;
      case "radio":
        ShowField = <EcRadio {...props} />;
        break;
      case "text":
        ShowField = <EcInput {...props} />;
        break;
      case "textArea":
        ShowField = <EcInput {...props} />;
        break;
      default:
        ShowField = <div key={"default"}>invalid form type {type}</div>;
        break;
    }
    console.log(condition ? true : false);
    const Field = condition ? (
      <WithConditional {...props}>{ShowField}</WithConditional>
    ) : (
      ShowField
    );
    return taggleable ? <WithTagging {...props}>{Field}</WithTagging> : Field;
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
}

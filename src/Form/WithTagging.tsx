import EcSelect from "./EcSelect";
export default function WithTagging(props) {
  const { children, methods, schema, ...rest } = props;
  const tagValues = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark"
  ];
  const tagSchema = {
    label: "Tag",
    name: `tag.${schema.name}`,
    type: "select",
    option: tagValues
  };

  return (
    <div>
      <EcSelect schema={tagSchema} methods={methods} {...rest} />
      {children}
    </div>
  );
}

import EcField from "./EcField";
import ErrorBoundary from "./ErrorBoundary";
export default function EcFields(props: any) {
  const { dataSchema, ...rest } = props;
  return (
    <>
      {dataSchema.map((schema: any) => (
        <div key={schema.name} style={{ marginBottom: "1rem" }}>
          {/* <div>
            <label htmlFor={schema.name}>{schema.label}</label>
          </div> */}
          <ErrorBoundary>
            <EcField schema={schema} {...rest} />
          </ErrorBoundary>
        </div>
      ))}
    </>
  );
}

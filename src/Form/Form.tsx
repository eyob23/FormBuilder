import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Row, Col, Button, Container } from "reactstrap";
import EcFields from "./EcFields";
export function EcErrorCounter({ resolver, control }: any) {
  const [count, setCount] = useState(0);
  const data = useWatch({
    control
  });
  useEffect(() => {
    resolver(data).then((e: any) => {
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
export function FormState({ reset, control, formState }: any) {
  const data = useWatch({
    control
  });
  const {
    isDirty,
    isValid,
    dirtyFields,
    // isSubmitted,
    isSubmitSuccessful,
    submitCount
  } = formState;
  const [lastCount, setLastCount] = useState(submitCount);

  useEffect(() => {
    if (isSubmitSuccessful && lastCount < submitCount) {
      reset(data, {
        keepErrors: false,
        keepDirty: false,
        keepIsSubmitted: true,
        keepTouched: false,
        keepIsValid: true,
        keepSubmitCount: true
      });
      setLastCount(submitCount);
    }
  }, [submitCount, isSubmitSuccessful, reset, data, lastCount]);
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
  validationSchema,
  id
}: any) {
  const resolver = useValidationResolver(validationSchema);
  const methods = useForm({
    defaultValues,
    resolver
  });
  const { handleSubmit, control } = methods;
  const [disabled, setIsDisabled] = useState<boolean | undefined>(undefined);
  const [readOnly, setReadonly] = useState<boolean | undefined>(undefined);
  return (
    <>
      <button type="button" onClick={() => setIsDisabled(!disabled)}>
        Toggle disabled for form:{id} {disabled ? "Disabled" : "Enabled"}
      </button>
      <button type="button" onClick={() => setReadonly(!readOnly)}>
        Toggle read/Edit mode for form:{id}{" "}
        {readOnly ? "Readonly mode" : "Edit mode"}
      </button>
      <Container fluid className="bg-light border">
        <Row>
          <Col xs="8" className="bg-light border">
            <form onSubmit={handleSubmit(onSubmit)}>
              <EcFields
                dataSchema={dataSchema}
                methods={methods}
                disabled={disabled}
                readOnly={readOnly}
              />
              {!readOnly && (
                <Button
                  disabled={disabled}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              )}
            </form>
          </Col>
          <Col xs="4" className="bg-light border">
            <FormState {...methods} />
            <EcErrorCounter resolver={resolver} control={control} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

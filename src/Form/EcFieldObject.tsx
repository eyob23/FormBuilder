import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import EcFields from "./EcFields";
export default function EcFieldObject(props) {
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

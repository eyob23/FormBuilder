import React from "react";
import { useFieldArray } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  CardHeader
} from "reactstrap";
import EcFields from "./EcFields";
export default function EcFieldArray(props: any) {
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
    <Card className="my-5 mx-4">
      <CardHeader>
        <CardTitle className="display-4">{label}</CardTitle>
        <CardSubtitle className="mb-2 text-muted">{`You can add more ${label} by clicking the add button`}</CardSubtitle>
      </CardHeader>
      <CardBody>
        {fields.map((item, index) => (
          <Card className="my-2 mx-4" key={item.id}>
            <CardHeader>
              <CardTitle className="display-6">{label}</CardTitle>
            </CardHeader>
            <CardBody>
              <EcFields
                dataSchema={listOfFieldItems?.map((schema: any) => ({
                  ...schema,
                  name: `${name}.${index}.${schema.name}`
                }))}
                methods={props.methods}
                {...rest}
              />
            </CardBody>
            <CardFooter>
              <Button
                type="button"
                color="danger"
                onClick={() => remove(index)}
              >
                Delete {name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </CardBody>
      <CardFooter>
        {/* {console.log("listOfFieldItems", listOfFieldItems)} */}
        <Button
          type="button"
          className="float-end"
          onClick={() => {
            //set default value using schema name prop(shallow copy)
            const newObj = listOfFieldItems.reduce(
              (acc: any, obj: any) => ({
                ...acc,
                [obj.name]:
                  obj.type === "listOfFieldItems"
                    ? [] //todo: recursive call to array if needed?
                    : obj.type === "object"
                    ? {} //todo: recursive call to object if needed?
                    : ""
              }),
              {}
            );
            //console.log("newObj", newObj);
            append(newObj);
          }}
        >
          Add new {name}
        </Button>
      </CardFooter>
    </Card>
  );
}

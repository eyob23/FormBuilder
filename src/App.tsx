import React from "react";
import Form from "./Form";
import useYupValidationResolver, {
  validationSchema
} from "./Form/useYupValidationResolver";
import "./styles.css";
interface FieldItem {
  label: string;
  name: string;
  type:
    | "text"
    | "select"
    | "textArea"
    | "checkbox"
    | "radio"
    | "editor"
    | "listOfFieldItems"
    | "object";
  option?: Array<string>;
  listOfFieldItems?: Array<FieldItem>;
}
interface FormData {
  firstName: string;
  lastName: string;
  sex: string;
  description: string;
  food: Array<string>;
  color: string;
  detialDescription: string;
  // country: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  nested: [
    {
      firstName: string;
      lastName: string;
      sex: string;
      description: string;
      food: Array<string>;
      color: string;
      detialDescription: string;
      fullName: {
        firstName: string;
        lastName: string;
      };
      nested2: [
        {
          firstName: string;
          lastName: string;
          sex: string;
          description: string;
          food: Array<string>;
          color: string;
          detialDescription: string;
          fullName: {
            firstName: string;
            lastName: string;
          };
        }
      ];
    }
  ];
}

const dataSchema: FieldItem[] = [
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  {
    label: "Sex",
    name: "sex",
    type: "select",
    option: ["female", "male", "Other"]
  },
  {
    label: "Fav Food",
    name: "food",
    type: "checkbox",
    option: ["pasta", "bread", "salad"]
  },
  {
    label: "Color",
    name: "color",
    type: "radio",
    option: ["red", "green", "black"]
  },
  { label: "Description", name: "description", type: "textArea" },
  { label: "Description", name: "detialDescription", type: "editor" },

  {
    label: "fullName",
    name: "fullName",
    type: "object",
    listOfFieldItems: [
      { label: "First Name", name: "firstName", type: "text" },
      { label: "Last Name", name: "lastName", type: "text" }
    ]
  },
  {
    label: "Nested",
    name: "nested",
    type: "listOfFieldItems",
    listOfFieldItems: [
      { label: "First Name", name: "firstName", type: "text" },
      {
        label: "Fav Food",
        name: "food",
        type: "checkbox",
        option: ["pasta", "bread", "salad"]
      },
      {
        label: "Color",
        name: "color",
        type: "radio",
        option: ["black", "green", "blue", "red"]
      },
      { label: "Last Name", name: "lastName", type: "text" },
      { label: "Description", name: "description", type: "textArea" },
      { label: "Description", name: "detialDescription", type: "editor" },
      { label: "Sex", name: "sex", type: "select", option: ["female", "male"] },
      {
        label: "fullName",
        name: "fullName",
        type: "object",
        listOfFieldItems: [
          { label: "First Name", name: "firstName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text" }
        ]
      },
      {
        label: "Nested2",
        name: "nested2",
        type: "listOfFieldItems",
        listOfFieldItems: [
          { label: "First Name", name: "firstName", type: "text" },
          {
            label: "Fav Food",
            name: "food",
            type: "checkbox",
            option: ["pasta", "bread", "salad"]
          },
          {
            label: "Color",
            name: "color",
            type: "radio",
            option: ["black", "green", "blue"]
          },
          { label: "Last Name", name: "lastName", type: "text" },
          { label: "Description", name: "description", type: "textArea" },
          { label: "Description", name: "detialDescription", type: "editor" },
          {
            label: "Sex",
            name: "sex",
            type: "select",
            option: ["female", "male"]
          },
          {
            label: "fullName",
            name: "fullName",
            type: "object",
            listOfFieldItems: [
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" }
            ]
          }
        ]
      }
    ]
  }
];

const data: FormData = {
  firstName: "smith",
  lastName: "Joe",
  sex: "male",
  description: "initial Description",
  food: ["salad", "pasta"],
  color: "",
  detialDescription: "This is more information",
  fullName: {
    firstName: "object first name",
    lastName: "object last name"
  },
  nested: [
    {
      firstName: "smith nested",
      lastName: "Joe nested",
      sex: "male",
      description: "initial Description  nested",
      food: ["salad", "pasta"],
      color: "red",
      detialDescription: "This is more information  nested",
      fullName: {
        firstName: "object first name",
        lastName: "object last name"
      },
      nested2: [
        {
          firstName: "smith nested2",
          lastName: "Joe nested2",
          sex: "male",
          description: "initial Description  nested2",
          food: ["salad", "pasta"],
          color: "blue",
          detialDescription: "This is more information  nested2",
          fullName: {
            firstName: "object first name",
            lastName: "object last name"
          }
        }
      ]
    }
  ]
};

export default function App() {
  const onSubmit = (data: FormData) => console.log(data);
  const numberOfForms = 1;
  return (
    <div style={{ margin: "2rem" }}>
      <h1>Form Builder from JSON</h1>
      {[...Array(numberOfForms)].map((e, i) => (
        <Form
          key={i.toString()}
          onSubmit={onSubmit}
          dataSchema={dataSchema}
          defaultValues={data}
          validationSchema={validationSchema}
          useValidationResolver={useYupValidationResolver}
        />
      ))}
    </div>
  );
}

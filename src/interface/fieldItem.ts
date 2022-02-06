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
export default FieldItem;

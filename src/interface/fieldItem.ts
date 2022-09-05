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
  taggleable?: boolean;
  condition?: {
    when: string;
    value: boolean | string | number | any[] | object;
    then: "show" | "hide"; //default show
    else?: "show" | "hide"; //default hide
    ShouldClearValue: boolean;
    ShouldPreserveHistory: boolean;
  };
}
export default FieldItem;

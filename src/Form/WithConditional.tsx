import { useWatch } from "react-hook-form";
export default function WithConditional({
  children,
  methods: { control },
  schema
}) {
  const condition = schema.condition;
  const watchValue = useWatch({
    control,
    name: condition.when
  });
  //todo:save last value for toggle undo
  //todo:clear value
  const useRef = null;
  //console.log("schema.condition", condition, watchValue);
  if (watchValue === condition.value) {
    switch (condition.then) {
      case "show":
        return children;
      case "hide":
      default:
        return null;
    }
  }
  return null;
}

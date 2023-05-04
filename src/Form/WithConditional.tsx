import { useRef, useEffect } from "react";
import { useWatch, UseFormReturn } from "react-hook-form";
import { isEqual } from "lodash";
import FieldItem from "../interface/fieldItem";
type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any, object>;
  schema: FieldItem;
};
export default function WithConditional({
  children,
  methods: { control, setValue },
  schema
}: Props) {
  const condition = schema?.condition;

  const fieldName = schema.name;
  const [watchedValue, watchFieldValue] = useWatch({
    control,
    name: [condition?.when || "", fieldName]
  });
  const ref = useRef();
  const showCondtionTrue = isEqual(watchedValue, condition?.value);
  useEffect(() => {
    if (showCondtionTrue && condition?.then) {
      if (
        condition?.ShouldClearValue &&
        condition?.ShouldPreserveHistory &&
        ref.current
      ) {
        setValue(fieldName, ref.current, { shouldValidate: true });
        ref.current = undefined;
      }
    } else {
      if (condition?.ShouldClearValue && watchFieldValue != null) {
        ref.current = watchFieldValue;
        setValue(fieldName, null, { shouldValidate: true });
      }
    }
  }, [
    showCondtionTrue,
    condition?.then,
    condition?.ShouldClearValue,
    watchFieldValue,
    condition?.ShouldPreserveHistory,
    setValue,
    fieldName
  ]);
  const onHide = () => {
    return null;
  };

  const onShow = () => {
    return ref.current ? null : <>{children}</>;
  };

  if (showCondtionTrue) {
    switch (condition?.then) {
      case "show":
        return onShow();
      case "hide":
      default:
        return onHide();
    }
  }
  return onHide();
}

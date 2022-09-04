import React from "react";
import { useController } from "react-hook-form";
import {
  Editor,
  EditorTools,
  EditorChangeEvent
} from "@progress/kendo-react-editor";
const {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignRight,
  AlignCenter,
  Indent,
  Outdent,
  OrderedList,
  UnorderedList,
  Undo,
  Redo,
  Link,
  Unlink
} = EditorTools;
export default function EcEditor(props: any) {
  const {
    methods: { control },
    schema: { name, label },
    disabled,
    ...rest
  } = props;
  const { field } = useController({
    name,
    control
  });
  if (rest.readOnly) {
    return (
      <div>
        {label}: {field.value}
      </div>
    );
  }
  const onChange = (event: EditorChangeEvent) => {
    field.onChange(event.html);
  };
  return (
    <Editor
      tools={[
        [Bold, Italic, Underline],
        [Undo, Redo],
        [Link, Unlink],
        [AlignLeft, AlignCenter, AlignRight],
        [OrderedList, UnorderedList, Indent, Outdent]
      ]}
      contentStyle={{ height: 320 }}
      onChange={onChange}
      defaultContent={field.value || undefined}
    />
    // <textarea onChange={field.onChange} value={field.value} name={field.name} />
  );
}

import React from "react";
import { useController } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function EcEditor(props) {
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
  return (
    <CKEditor
      editor={ClassicEditor}
      data={field.value}
      id={name}
      disabled={disabled}
      onReady={(editor) => {
        // editor.disabled  = disabled ;
        // editor.editing.view.change((writer) => {
        //   writer.setStyle(
        //     "height",
        //     "10vh",
        //     editor.editing.view.document.getRoot()
        //   );
        // });
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        field.onChange(data);
      }}
    />
  );
}

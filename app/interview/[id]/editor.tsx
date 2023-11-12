"use client";

import { Editor } from "@monaco-editor/react";

export default function Default() {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  );
}

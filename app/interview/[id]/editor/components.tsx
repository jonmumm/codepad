"use client";

import { javascript } from "@codemirror/lang-javascript";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { useCallback, useState } from "react";

export const Editor = () => {
  const [value, setValue] = useState("console.log('hello world!');");
  const onChange = useCallback((val: string, viewUpdate: ViewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);

  return (
    <CodeMirror
      value={value}
      height="200px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};

"use client";

import CodeMirror, {
  ViewUpdate,
  basicSetup,
  EditorView,
} from "@uiw/react-codemirror";

import { yCollab } from "y-codemirror.next";

import { javascript } from "@codemirror/lang-javascript";

import useYProvider from "y-partykit/react";
import * as Y from "yjs";

import getConfig from "next/config";
import { useCallback, useState } from "react";

console.log(getConfig());

// PublicConfigSchema(process.env)
const code = "console.log('hello world1!');\n\n\n";
const extensions = [javascript()];

// export const Editor = () => {
//   const [yDoc] = useState(new Y.Doc());
//   // const [provider] = useState(
//   //   new YPartyKitProvider("localhost:1999", "my-document-name", yDoc)
//   // );
//   const provider = useYProvider({
//     host: "localhost:1999",
//     room: "my-document-name",
//     doc: yDoc, // optional!
//     options: {},
//   });
//   const [yText] = useState(yDoc.getText("codemirror"));
//   const [yUndoManager] = useState(new Y.UndoManager(yText));

//   const editor = useRef<HTMLDivElement>(null);
//   const { state, view, setState, setView, setContainer } = useCodeMirror({
//     container: editor.current,
//     extensions,
//     value: code,
//   });
//   const [binding] = useState(
//     new CodeMirrorBinding(yText, view, provider.awareness, {
//       yUndoManager,
//     })
//   );

//   useEffect(() => {
//     if (editor.current) {
//       setContainer(editor.current);
//     }
//   }, [editor, setContainer]);

//   return <div ref={editor} />;
// };

export const Editor = ({ interviewId }: { interviewId: string }) => {
  const [yDoc] = useState(new Y.Doc());
  const [yText] = useState(yDoc.getText("codemirror"));
  const [undoManager] = useState(new Y.UndoManager(yText));
  const [value, setValue] = useState(yText.toString());
  const onChange = useCallback((val: string, viewUpdate: ViewUpdate) => {
    setValue(val);
  }, []);

  const provider = useYProvider({
    host: "localhost:1999",
    room: interviewId,
    party: "editor",
    doc: yDoc,
    options: {},
  });

  return (
    <CodeMirror
      value={value}
      minHeight="50vh"
      maxHeight="70vh"
      width="100%"
      maxWidth="100%"
      extensions={[
        basicSetup(),
        javascript(),
        yCollab(yText, provider.awareness, { undoManager }),
      ]}
      onChange={onChange}
      // onCreateEditor={(view, state) => {
      //   console.log({ view, state });
      // }}
    />
  );
};

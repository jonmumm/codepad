"use client";

import CodeMirror, { ViewUpdate, basicSetup } from "@uiw/react-codemirror";
import { yCollab } from "y-codemirror.next";
import { javascript } from "@codemirror/lang-javascript";
import useYProvider from "y-partykit/react";
import * as Y from "yjs";
import { PARTYKIT_HOST } from "@/app/env";
import { useCallback, useState } from "react";

export const Editor = ({ interviewId }: { interviewId: string }) => {
  const [yDoc] = useState(new Y.Doc());
  const [yText] = useState(yDoc.getText("codemirror"));
  const [undoManager] = useState(new Y.UndoManager(yText));
  const [value, setValue] = useState(yText.toString());
  const onChange = useCallback((val: string, viewUpdate: ViewUpdate) => {
    setValue(val);
  }, []);

  const provider = useYProvider({
    host: PARTYKIT_HOST,
    room: interviewId,
    party: "editor",
    doc: yDoc,
    options: {},
  });

  return (
    <div className="min-h-[40vh]">
      <CodeMirror
        className="flex flex-1"
        value={value}
        minHeight="40vh"
        maxHeight="45vh"
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
    </div>
  );
};

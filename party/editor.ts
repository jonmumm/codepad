import type * as Party from "partykit/server";
import { onConnect } from "y-partykit";
import * as Y from "yjs";

import { z } from "zod";
import { SyncEditor } from "./utils/message";
import { json, ok } from "./utils/response";
import { EditorCreatePropsSchema } from "./lib";
import { assert } from "@/lib/utils";

export default class EditorServer implements Party.Server {
  constructor(public party: Party.Party) {}

  onConnect(conn: Party.Connection) {
    const party = this.party;

    return onConnect(conn, party, {
      async load() {
        const content = await party.storage.get<string>("initialCode");
        assert(
          content,
          "expected initial content, editor has not been initialized"
        );
        const ydoc = new Y.Doc();
        ydoc.getText("codemirror").insert(0, content);

        return ydoc;
      },
      callback: {
        async handler(yDoc) {
          party.storage.put("value", yDoc.getText("codemirror").toString());
        },
      },
    });
  }

  async onRequest(req: Party.Request) {
    if (req.method === "POST") {
      // await req.json();
      const { code: initialCode } = EditorCreatePropsSchema.parse(await req.json());
      this.party.storage.put("initialCode", initialCode);
      return ok();
    } else {
      const value = z.string().parse(await this.party.storage.get("value"));
      return json<SyncEditor>({ type: "sync", value });
    }
  }
}

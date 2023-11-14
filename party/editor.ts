import type * as Party from "partykit/server";
import { onConnect } from "y-partykit";
import { z } from "zod";
import { SyncEditor } from "./utils/message";
import { json } from "./utils/response";

export default class YjsServer implements Party.Server {
  constructor(public party: Party.Party) {}

  onConnect(conn: Party.Connection) {
    const party = this.party;

    return onConnect(conn, party, {
      callback: {
        async handler(yDoc) {
          party.storage.put("value", yDoc.getText("codemirror").toString());
        },
      },
    });
  }

  async onRequest(req: Party.Request) {
    const value = z.string().parse(await this.party.storage.get("value"));
    return json<SyncEditor>({ type: "sync", value });
  }
}

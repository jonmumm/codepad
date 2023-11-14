import { assert } from "@/lib/utils";
import { ConfigSchema, PublicConfigSchema } from "../schema";
import { Checkout } from "./components";
import { headers } from "next/headers";

import Stripe from "stripe";

const { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } =
  ConfigSchema.parse(process.env);

const stripe = new Stripe(STRIPE_SECRET_KEY);

export default async function Page() {
  const headerList = headers();
  console.log(Object.fromEntries(headerList.entries()));
  const host = headerList.get("host");

  const referer = headerList.get("referer");
  const protocol = referer?.match("https") ? "https" : "http";

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1OBsSdJxfUe8UQZ1YhlcIThe",
        quantity: 1,
      },
    ],
    mode: "subscription",
    return_url: `${protocol}://${host}/return?session_id={CHECKOUT_SESSION_ID}`,
    automatic_tax: { enabled: true },
  });
  assert(session.client_secret, "expected client secret from stripe");

  return (
    <div>
      <h1>Subscription</h1>
      <Checkout
        clientSecret={session.client_secret}
        publishableKey={NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      />
    </div>
  );
}

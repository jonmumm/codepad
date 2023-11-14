"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";

export const Checkout = ({
  clientSecret,
  publishableKey,
}: {
  clientSecret: string;
  publishableKey: string;
}) => {
  const stripe = useMemo(() => loadStripe(publishableKey), [publishableKey]);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider stripe={stripe} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

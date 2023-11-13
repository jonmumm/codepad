"use client";

import { SessionProvider } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51O6g6vJxfUe8UQZ19nMASzGOVmbXGGXt3N6D6tclupF2Ha5jBglQbqMXUoND10B4SEJAvgEH4mLPmyBvkHQWHfq200VlS5T61r"
);

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

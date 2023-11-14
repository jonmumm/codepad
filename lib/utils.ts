import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function assert<T>(
  expression: T,
  errorMessage: string
): asserts expression {
  if (!expression) {
    throw new Error(errorMessage);
  }
}

export function noop() {}

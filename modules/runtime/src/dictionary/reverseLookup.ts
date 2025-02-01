import type { Dictionary, ReverseLookup } from "inferred-types/types";

export function reverseLookup<
  T extends Record<string, string>
>(lookup: T) {
  const result: Dictionary = {};
  for (const key of Object.keys(lookup).reverse()) {
    result[lookup[key]] = key;
  }

  return result as ReverseLookup<T>;
}

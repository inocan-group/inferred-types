import type { RuntimeUnion } from "inferred-types/types";

/**
 * **isRuntimeUnion**
 *
 * A type guard which checks whether the passed in value is a `RuntimeUnion`.
 */
export function isRuntimeUnion<T extends unknown[]>(val: unknown): val is RuntimeUnion<T> {
  return !!(typeof val === "object" && "kind" in (val as object) && (val as any).kind === "Union");
}

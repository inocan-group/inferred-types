import type { ErrorCondition } from "inferred-types/types";
import { isObject } from "inferred-types/runtime";

/**
 * **isErrorCondition**(value)
 *
 * Type guard which checks whether the given value is a `ErrorCondition` type.
 */
export function isErrorCondition<
  TKind extends string | null,
  T extends ErrorCondition<TKind extends null ? string : TKind>,
>(value: unknown | T, kind: TKind = null as TKind): value is T {
  return isObject(value) && "__kind" in value && value.__kind === "ErrorCondition" && "kind" in value
    ? kind !== null
      ? value.kind === kind
      : true
    : false;
}

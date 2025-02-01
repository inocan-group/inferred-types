import type { EachAsString, Narrowable } from "inferred-types/types";
import { asString } from "inferred-types/runtime";

export function eachAsString<
  T extends readonly N[],
  N extends Narrowable,
>(...tuple: T) {
  return tuple.map(
    i => asString(i),
  ) as EachAsString<T>;
}

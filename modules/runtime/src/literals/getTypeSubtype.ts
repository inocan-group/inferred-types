import type { RetainAfter, RetainUntil, TypeSubtype } from "inferred-types/types";
import { isTypeSubtype } from "src/type-guards";

/**
 * **getTypeSubTyp**`(str)`
 *
 * Returns a two element tuple representing the `Type` and `SubType`
 * independantly.
 *
 * - can take either a "blessed" `TypeSubtype` as input or any string
 * literal of `${string}/${string}` but in the latter case if the
 * string does not pass the isTypeSubtype() test then it will throw
 * an error (InvalidTypeSubtype).
 *
 * **Related:** `TypeSubtype`, `isTypeSubtype`
 */
export function getTypeSubtype<T extends TypeSubtype | `${string}/${string}`>(str: T) {
  if (isTypeSubtype(str)) {
    const [t, st] = str.split("/");

    return [t, st] as [RetainUntil<T, "/">, RetainAfter<T, "/">];
  }
  else {
    const err = new Error(`An invalid Type/Subtype was passed into getTypeSubtype(${str})`);
    err.name = "InvalidTypeSubtype";
    throw err;
  }
}

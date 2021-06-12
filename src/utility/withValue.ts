import { ExpandRecursively, WithValue } from "~/types";
import { entries } from "./entries";
import { ifTypeOf } from "./ifTypeOf";

/**
 * **withValue**
 * 
 * Reduces a dictionary object -- in both _type_ and _run-time_ structure -- to only those 
 * key/value pairs which have a specified value. For instance:
 * 
 * ```ts
 * const obj = { foo: 1, message: "hi there" };
 * // { message: "hi there" }
 * const onlyStrings = withValue("")(obj);
 * ```
 * 
 * Note: _often useful to provide run-time type profiles with the_ `inferredType` _utility_
 */
export function withValue<W extends any>(type: W) {
  return <T extends object, K extends Array<keyof WithValue<W, T>>>(obj: T) => {

    return Object.fromEntries(
      [...entries(obj)].filter(([_key, value]) => {
        return ifTypeOf(value).extends(type);
      })
    ) as ExpandRecursively<Omit<WithValue<W, T>, K[number]>>;
  };
}
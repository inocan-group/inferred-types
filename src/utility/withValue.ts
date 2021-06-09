import { ExpandRecursively, WithValue } from "~/types";
import { ifTypeOf } from "./ifTypeOf";

/**
 * **withValue**
 * 
 * Reduces a dictionary object to only those key/value pairs which have a specified
 * value. For instance:
 * 
 * ```ts
 * const obj = { foo: 1, message: "hi there" };
 * // { message: "hi there" }
 * const onlyStrings = withValue("")(obj);
 * ```
 */
export function withValue<W extends any>(type: W) {
  return <T extends {}, K extends Array<keyof WithValue<W, T>>>(obj: T) => {

    return Object.fromEntries(
      Object.entries(obj).filter(([_key, value]) => {
        return ifTypeOf(value).extends(type);
      })
    ) as ExpandRecursively<Omit<WithValue<W, T>, K[number]>>;
  };
}
import { Keys } from "src/types/Keys";
import { Narrowable } from "..";
import { isArray, isObject } from "./type-guards";

/**
 * **keys**(obj)
 * 
 * Provides a read-only array of the _keys_ an object (or array) contains.
 * 
 * **Note:** it will accept any _narrowable_ value but any type other than 
 * an array or object will return `[]`.
 */
export function keys<
  TObj extends Narrowable
>(obj: TObj) {
  return (
    isObject(obj) || isArray(obj) ? Object.keys(obj) : [] as readonly []
  ) as unknown as Keys<TObj>;
}


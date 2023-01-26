import { isObject } from "../type-guards/isObject";
import { AnyObject } from "src/types/boolean-logic/object";
import { Keys } from "src/types/Keys";


/**
 * **keys**(obj)
 * 
 * Provides a read-only array of the _keys_ an object (or array) contains.
 * 
 * **Note:** it will accept any _narrowable_ value but any type other than 
 * an array or object will return `[]`.
 */
export function keys<
  TObj extends AnyObject
>(obj: TObj) {
  return (
    isObject(obj)
      ? Object.keys(obj)
      : [] as readonly []
  ) as unknown as Keys<TObj>;
}

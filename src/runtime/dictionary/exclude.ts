import { TupleToUnion } from "src/types";
import { AnyObject } from "src/types/boolean-logic/object";
import { keys } from "../keys";

/**
 * **exclude**(obj, excluding)
 * 
 * 
 */
export function exclude<
  TObj extends AnyObject,
  TExclude extends readonly (string & keyof TObj)[]
>(obj: TObj, ...excluding: TExclude): Exclude<TObj, TupleToUnion<TExclude>> {
  return keys(obj, ...excluding).reduce(
    (acc, key) => ({
      ...acc, 
      [key]: excluding.includes(key) ? undefined : obj[key]
    }),
    {} as Exclude<TObj, TupleToUnion<TExclude>>
  )
}

import type { TupleToUnion, AnyObject } from "src/types";
import { keys } from "./keys";

/**
 * **exclude**(obj, excluding)
 * 
 * Runtime utility which _excludes_ certain **keys** from an object. 
 */
export function exclude<
  TObj extends AnyObject,
  TExclude extends readonly (string & keyof TObj)[]
>(obj: TObj, ...excluding: TExclude): Exclude<TObj, TupleToUnion<TExclude>> {
  return keys(obj).reduce(
    (acc, key) => excluding.includes(key)
      ? acc
      : {
        ...acc,
        [key]: obj[key]
      },
    {} as Exclude<TObj, TupleToUnion<TExclude>> 
  );
}

import { keys } from "./Keys";
import { DictArray } from "~/types";

/**
 * **dictToArray**
 * 
 * Converts a dictionary object into an array of `KeyValue` dictionaries
 * while maintaining type definitions.
 * 
 * ```ts
 * const example = { foo: 1, bar: "hi" };
 * // [ ["foo", { foo: number }], [ "bar", { bar: string }]  ]
 * const arr = dictToArray(example);
 * ```
 * 
 * > If you want values to be _literal_ types be sure to leverage `literal()`
 * > utility function.
 */
export function dictToArray<T extends object>(obj: T): DictArray<T> {
  const out: any = [];

  for (const key of keys(obj)) {
    out.push([key, { [key]: obj[key] }]);
  }

  return out as DictArray<T>;
}
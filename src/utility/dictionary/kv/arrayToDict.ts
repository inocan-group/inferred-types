import { FromDictArray } from "~/types/tuples";

/**
 * **arrayToDict**
 * 
 * Converts an Array Tuple definition of an object -- sourced from
 * `dictToArray()` -- back to a strongly typed object.
 * ```ts
 * // { foo: 1, bar: "hi" }
 * const dict = arrayToDict([
 *   ["foo", { foo: 1 }], 
 *   ["bar", { bar: "hi"}]
 * ]);
 * ```
 */
export function arrayToDict<T extends Array<{ [K in keyof T]: [string, Record<string, unknown>] }[keyof T]>>(arr: T): FromDictArray<T> {
  const out: any = {};

  for (const kv of arr) {
    const [k, v] = kv;
    out[k] = v[k];
  }

  return out as FromDictArray<T>;
}


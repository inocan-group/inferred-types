import { DictArray } from "~/types";

/**
 * **arrayToDict**
 * 
 * Converts an Array Tuple definition of an object -- sourced from
 * `dictToArray()` -- back to a strongly typed object.
 */
export function arrayToDict<T extends object>(arr: DictArray<T>): T {
  const out: any = {};

  for (const kv of arr) {
    const [k, v] = kv;
    out[k] = v[k];
  }


  return out as T;
}
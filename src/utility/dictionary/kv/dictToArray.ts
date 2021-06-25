import { keys } from "~/utility";
import type { DictArray, DictArrayFilterCallback } from "~/types";

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
 */
export function dictToArray<T extends object>(obj: T): DictArray<T> {
  const out: any = [];

  for (const key of keys(obj)) {
    out.push([key, { [key]: obj[key] }]);
  }

  return out as DictArray<T>;
}

/**
 * Accepts a `DictArray` and a callback which receives each key
 * value pair.
 */
export function filterDictArray<
  T extends object,
  C extends DictArrayFilterCallback<keyof T, T>,
  >(dictArr: DictArray<T>, cb: C) {
  const remove = {} as Record<keyof T, true>;

  // for (const [k, v] of dictArr) {
  //   if (!cb(k, v)) {
  //     remove.push(k);
  //   }
  // }

  return dictArr.filter(i => {
    const [k, v] = i;
    const keep = cb(k, v);
    if (!keep) {
      remove[k] = true;
      console.log(remove);

    }
    return keep;
  }) as unknown as DictArray<Exclude<T, keyof typeof remove>>;

}


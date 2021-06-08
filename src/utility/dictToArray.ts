import { keys } from "./Keys";

export type DictArray<T> = Array<{ [K in keyof T]: [K, Pick<T, K>] }[keyof T]>;

/**
 * Converts a dictionary object into an array of `KeyValue` dictionaries
 * while maintaining narrow type definitions.
 * 
 * ```ts
 * const example = { foo: 1, bar: "hi" };
 * // [ ["foo", { foo: 1 }], [ "bar", { bar: "hi" }]  ]
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


export function arrayToDict<T extends object>(arr: DictArray<T>): T {
  const out: any = {};

  for (const kv of arr) {
    const [k, v] = kv;
    out[k] = v[k];
  }

  return out as T;
}
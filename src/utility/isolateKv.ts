import { KvTuple } from "~/types/KvTuple";
import { Narrowable } from "~/types/Narrowable";
import { iterateDict } from "~/utility";

/**
 * Converts a dictionary of key/value pairs into an array of KV
 * isolates.
 * 
 * Example:
 * ```ts
 * const obj = { foo: 1, bar: "hi" };
 * const isolates = isolateKv(obj);
 * // [
 * //  ['foo', { foo: 1 }],
 * //  ["bar", { bar: "hi" }]
 * // ]
 * ```
 **/
export function isolateKv<N extends Narrowable, T extends Record<keyof T & string, N>>(obj: T) {
  const isolates = [];

  for (const [k, v] of iterateDict(obj)) {
    const isolate = [k, { [k]: v }];
    isolates.push(isolate);
  }

  return isolates as KvTuple<T, keyof T>[];
}

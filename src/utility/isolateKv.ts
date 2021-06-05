import { KV } from "~/KV";
import { entries } from "~/utility";

// export type KvIsolate = <R extends any>() => R extends [infer K, object]
//   ? [K, object] extends [K, Record<any, infer V>] ? [K, V] : [K, unknown]
//   : never;

// export type KvIsolate<T extends {[K in keyof T]: any}> = [Readonly<K>, any];



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
export function isolateKv<T extends NonNullable<object>>(obj: T) {
  const isolates = [];

  for (const [k, v] of entries(obj)) {
    if (typeof k === "string") {
      const kv = KV(k, v);
      const isolate = [k, kv];
      isolates.push(isolate);
    }
  }

  return isolates;
}

import { KV } from "~/KV";
import { entries } from "~/utility";

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
  const isolates: [string, object][] = [];

  for (const [k, v] of entries(obj)) {
    if (typeof k === "string") {
      const kv = KV(k, v);
      const isolate = [k, kv];
      isolates.push(isolate);
    }
  }

  return isolates;
}

import { Narrowable } from "~/types";
import { KvFrom } from "~/types/kv/KvFrom";
import { keys } from "~/utility/keys";

/**
 * Converts a dictionary object into an array of dictionaries with `key` and `value` properties
 * ```ts
 * // [ { key: "id", value: 123 }, { key: "foo", value: "bar" } ]
 * const arr = dictToKv({ id: 123, foo: "bar" });
 * ```
 */
export function dictToKv<N extends Narrowable, T extends Record<string, N>>(obj: T): KvFrom<T> {
  return keys(obj).map(k => {
    return { key: k, value: obj[k] };
  });
}

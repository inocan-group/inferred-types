import { KvFrom } from "types/kv";
import { Narrowable } from "types/literals/Narrowable";
import { UnionToTuple } from "types/type-conversion";
import { keys } from "runtime/dictionary/keys";

/**
 * Converts a dictionary object into an array of dictionaries with `key` and `value` properties
 * ```ts
 * // [ { key: "id", value: 123 }, { key: "foo", value: "bar" } ]
 * const arr = dictToKv({ id: 123, foo: "bar" });
 * ```
 */
export function dictToKv<N extends Narrowable, T extends { [key: string]: N }, U extends boolean>(
  obj: T,
  _makeTuple: U = false as U
) {
  return keys(obj).map((k) => {
    return { key: k, value: obj[k] };
  }) as unknown as U extends true ? UnionToTuple<KvFrom<T>[0]> : KvFrom<T>;
}

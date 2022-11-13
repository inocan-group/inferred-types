import { KvFrom } from "src/types/kv";
import { Mutable } from "src/types/Mutable";
import { Narrowable } from "src/types/Narrowable";
import { UnionToTuple } from "src/types/type-conversion";
import { keys } from "src/runtime/keys";

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
  }) as unknown as U extends true ? UnionToTuple<KvFrom<Mutable<T>>[0]> : KvFrom<Mutable<T>>;
}

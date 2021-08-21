import { Mutable, Narrowable } from "~/types";
import { DictFromKv } from "~/types/kv";

/**
 * Converts an array of dictionaries with `key` and `value` properties to a singular dictionary.
 * ```ts
 * // { id: 123, foo: "bar" }
 * const arr = kvToDict([{ key: "id", value: 123 }, { key: "foo", value: "bar" }]);
 * ```
 *
 * Note: this is the inverse of `dictToKv()` function
 */
export function kvToDict<
  K extends string,
  V extends Narrowable,
  T extends readonly Readonly<{ key: K; value: V }>[]
>(kvArr: T): DictFromKv<T> {
  const out = {} as any;
  for (const kv of kvArr) {
    out[kv.key as keyof DictFromKv<T>] = kv.value;
  }

  return out as DictFromKv<Mutable<T>>;
}

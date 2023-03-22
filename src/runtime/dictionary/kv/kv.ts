import { ExpandRecursively, Narrowable } from "src/types";


/**
 * Build a key-value pair where both _key_ and _value_ are inferred. This
 * includes ensuring that the _key_ is a type literal not just a "string".
 *
 * > note: the value will be inferred but if you need to constrain it
 * > to a narrower type then both inferences will break and you should
 * > instead use `KV2` to get this capability.
 */
export function kv<
  K extends PropertyKey,
  N extends Narrowable,
  V extends Record<K, N> | boolean | number | string | null | undefined
>(key: K, value: V) {
  return { [key]: value } as ExpandRecursively<Record<K, V>>;
}

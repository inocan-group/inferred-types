/**
 * Build a key-value pair where both _key_ and _value_ are inferred. This
 * includes ensuring that the _key_ is a type literal not just a "string".
 *
 * > note: the value will be inferred but if you need to constrain it
 * > to a narrower type then both inferrences will break and you should
 * > instead use `KV2` to get this capability.
 */
export function KV<V extends any, K extends string>(key: K, value: V) {
  return { [key]: value } as Record<K, V>;
}

/**
 * Build a key-value pair where the _key_ is a type literal
 */
export const KV2 = <V extends any>() => <K extends string & keyof V>(key: K, value: V) => {
  return { [key]: value } as Record<K, V>;
};

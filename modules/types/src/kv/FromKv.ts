/**
 * **FromKv**`<T>`
 *
 * Converts a tuple of `KeyValue` objects into a narrowly typed object.
 *
 * ```ts
 * // { foo: 1; bar: "hi" }
 * type FooBar = FromKv<[
 *    { key: "foo", value: 1 },
 *    { key: "bar", value: "hi" }
 * ]>;
 * ```
 *
 * **Related:** `ToKv`, `KeyValue`
 */
export type FromKv<T extends readonly { key: string; value: unknown }[]> = {
  [R in T[number] as R["key"]]: R["value"];
};

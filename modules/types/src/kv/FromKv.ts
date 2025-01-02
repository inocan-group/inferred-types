import type {
  ExpandDictionary,
  KeyValue,
  UnionToIntersection,
} from "inferred-types/types";

/** Converts a single KeyValue into a one-key object */
type KeyValueToObj<KV extends { key: PropertyKey; value: unknown }> = {
  [P in KV["key"]]: KV["value"];
};

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
export type FromKv<T extends readonly KeyValue[]> =
ExpandDictionary<
  UnionToIntersection<
    T[number] extends infer U
      ? U extends KeyValue
        ? KeyValueToObj<U>
        : never
      : never
  >
>;

/**
 * Type utility which takes an object type and converts to an array of KV objects:
 * ```ts
 * // [ {key: "id", value: 123 } | {key: "foo", value: "bar" } ][]
 * type Arr = KvFrom<{ id: 123, foo: "bar" }>;
 * ```
 */
export type KvFrom<T extends object> = Array<{ [K in keyof T]: { key: K; value: T[K] } }[keyof T]>;
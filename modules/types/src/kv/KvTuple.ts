/**
 * **KvTuple**
 * 
 * a key/value of type `T` represented as `[key, kv]`
 * 
 * ```ts
 * type Obj = { foo: 1, bar: "hi" };
 * // ["foo", { foo: 1 } ]
 * type Foo = KvTuple<Obj, "foo">;
 * ```
 * 
 * **Note:** _consider use of `KeyValue<T,K>` as an alternate representation_
 */
export type KvTuple<T, K extends keyof T> = [K, Record<K, T[K]>];

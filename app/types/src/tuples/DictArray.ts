/* eslint-disable no-use-before-define */
export type DictArrayFilterCallback<K extends keyof T, T extends object, R extends true | false> = (key: K, value: Pick<T, K>) => R;

/**
 * An element in a `DictArray` shaped as a two element tuple: `[key, kv]`.
 */
export type DictArrayKv<K extends keyof T, T> = [K, Pick<T, K>];

export type DictKvTuple<K extends string> = [K, Record<K, unknown>];

/**
 * A an array of `DictArrayKv` tuples which can be reconstructed
 * to a strongly typed dictionary object.
 * ```ts
 * const example: DictArray<{ foo: 1, bar: "hi" }> = [
 *   [ "foo", { foo: 1 }],
 *   [ "bar", { bar: "hi" }]
 * ]
 * ```
 */
export type DictArray<T> = Array<{ [K in keyof T]: DictArrayKv<K, T> }[keyof T]>;

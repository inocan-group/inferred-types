import { Alpha } from "common-types";

/**
 * Extracts the _required_ keys in the object's type
 */
export type RequiredKeys<T extends object> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];

/**
 * Extracts the _optional_ keys in the object's type
 */
export type OptionalKeys<T extends object> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never;
}[keyof T];

/**
 * The _keys_ on a given object `T` which have a literal value of `W`.
 *
 * Optionally, you may provide a generic `E` to exclude certain keys in
 * resultset.
 * ```ts
 * // "foo"
 * type Str = KeysWithValue<{ foo: "hi"; bar: 5 }>;
 * ```
 */
export type KeysWithValue<W extends any, T extends object> = {
  [K in keyof T]: T[K] extends W ? Readonly<K> : never;
}[keyof T];

/**
 * A `PrivateKey` must start with a `_` character and then follow with
 * an alphabetic character
 */
export type PrivateKey = `_${Alpha}${string}`;

/**
 * Keys on an object which have a `_` character as first part of the
 * name are considered private and this utility will create a union
 * of all the keys in this category.
 */
export type PrivateKeys<T extends object> = {
  [K in keyof T]: K extends `_${string}` ? K : never;
}[keyof T];

/**
 * **PublicKeys**
 *
 * Builds a union type of all keys which are "public" where a public
 * key is any key which _does not_ start with the `_` character.
 */
export type PublicKeys<T extends object> = {
  [K in keyof T]: K extends `_${string}` ? never : K;
}[keyof T];

export type StringKeys<T extends object> = {
  [K in keyof T]: K extends string ? Readonly<K> : never;
}[keyof T];

/**
 * The keys of an object which _are not_ a string type
 */
export type NonStringKeys<T extends object> = {
  [K in keyof T]: K extends string ? never : Readonly<K>;
}[keyof T];

export type NumericKeys<T extends object> = {
  [K in keyof T]: K extends number ? Readonly<K> : never;
}[keyof T];

export type NonNumericKeys<T extends object> = {
  [K in keyof T]: K extends number ? never : Readonly<K>;
}[keyof T];

/**
 * **RequiredProps**
 *
 * Reduces an object type to only key/value pairs where the key is required
 */
export type RequiredProps<T extends object> = Pick<T, RequiredKeys<T>>;

/**
 * **OptionalProps**
 *
 * Reduces an object to only key/value pairs where the key is optional
 */
export type OptionalProps<T extends object> = Pick<T, RequiredKeys<T>>;

/**
 * **WithValue**
 *
 * Reduces an object's type down to only those key/value pairs where the
 * value is of type `W`.
 * ```ts
 * const foo = { a: 1, b: "hi", c: () => "hello" }
 * // { c: () => "hello" }
 * type W = WithValue<Function, typeof foo>
 * ```
 */
export type WithValue<
  W extends any,
  T extends object,
  E extends any = undefined
> = undefined extends E
  ? // no exclusion provided
    Pick<T, KeysWithValue<W, T>>
  : // Exclude using E
    Omit<Pick<T, KeysWithValue<W, T>>, KeysWithValue<E, T>>;

/**
 * Reduces an object to only the key/value pairs where the key is a
 * string.
 */
export type WithStringKeys<T extends object> = Omit<T, NonStringKeys<T>>;

/**
 * Reduces an object to only the key/value pairs where the key is numeric.
 */
export type WithNumericKeys<T extends object> = Omit<T, NonNumericKeys<T>>;

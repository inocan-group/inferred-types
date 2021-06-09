

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
 * The _keys_ on a given object `T` which have a literal value of `W`
 */
export type KeysWithValue<W extends any, T extends object> = {
  [K in keyof T]: T[K] extends W ? Readonly<K> : never
}[keyof T];


export type StringKeys<T extends object> = {
  [K in keyof T]: K extends string ? Readonly<K> : never
}[keyof T];

/**
 * The keys of an object which _are not_ a string type
 */
export type NonStringKeys<T extends object> = {
  [K in keyof T]: K extends string ? never : Readonly<K>
}[keyof T];

export type NumericKeys<T extends object> = {
  [K in keyof T]: K extends number ? Readonly<K> : never
}[keyof T];

export type NonNumericKeys<T extends object> = {
  [K in keyof T]: K extends number ? never : Readonly<K>
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
 */
export type WithValue<W extends any, T extends object> = Pick<T, KeysWithValue<W, T>>;

/**
 * Reduces an object to only the key/value pairs where the key is a
 * string.
 */
export type WithStringKeys<T extends object> = Omit<T, NonStringKeys<T>>;

/**
 * Reduces an object to only the key/value pairs where the key is numeric.
 */
export type WithNumericKeys<T extends object> = Omit<T, NonNumericKeys<T>>;


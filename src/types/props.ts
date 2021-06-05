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
 * The _keys_ on a given object `T` which have a value of `W`
 */
export type KeysWithValue<W extends any, T extends object> = {
  [K in keyof T]: T[K] extends W ? K : never
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
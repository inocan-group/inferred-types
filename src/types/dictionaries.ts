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
 * **RequiredProps**
 *
 * Reduces an object to only key/value pairs where the key is required
 */
export type RequiredProps<T extends object> = Pick<T, RequiredKeys<T>>;

/**
 * **OptionalProps**
 *
 * Reduces an object to only key/value pairs where the key is optional
 */
export type OptionalProps<T extends object> = Pick<T, RequiredKeys<T>>;

/**
 * Validates whether the type `S` is a valid representation of `Partial<T>`
 * but if it _is_ then it maintains the explicit type information for `S`
 */
export type PartialOf<S extends object, T extends object> = S extends Partial<T> ? S : never;

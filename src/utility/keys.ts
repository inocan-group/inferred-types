/**
 * Provides the _keys_ of an object with the `keyof T` made explicit.
 */
export function keys<T extends {}>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}
/**
 * Provides the _keys_ of an object with the typing made explicit.
 *
 * > this is an alternative to `Object.keys()` which isn't perfect from
 * a typing standpoint.
 */
export function Keys<T extends {}, K extends keyof T = keyof T>(obj: T) {
  if (obj === null) {
    throw new Error("Can not run keys() on a null value!");
  }
  return Object.keys(obj) as K[];
}
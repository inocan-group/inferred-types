/**
 * **isDefined**(value)
 * 
 * Type guard which determines whether a type is _defined_ or not 
 * (aka, whether the value is **not** _undefined_).
 */
export function isDefined<T extends any>(value: T): value is Exclude<T,undefined> {
  return (typeof value === "undefined") ? false : true;
}

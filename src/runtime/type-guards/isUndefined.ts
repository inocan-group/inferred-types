

/**
 * **isUndefined**(value)
 * 
 * Type guard which determines whether a type is undefined or not.
 */
export function isUndefined(value: undefined | unknown): value is undefined {
  return (typeof value === "undefined") ? true : false;
}

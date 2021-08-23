export type IsBoolean<T> = T extends boolean ? true : false;

/**
 * Runtime and type checks whether a variable is a boolean value.
 */
export function isBoolean<T extends any>(i: T) {
  return (typeof i === "boolean") as IsBoolean<T>;
}

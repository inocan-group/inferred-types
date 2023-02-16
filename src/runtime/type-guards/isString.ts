
/**
 * **isString**
 *
 * Returns true or false on whether the passed in parameter is a
 * string (either a wide string or a string literal).
 *
 * The boolean return is traceable by the type system as well as the
 * runtime system.
 */
export function isString<T>(value: T): value is T & string {
  return (typeof value === "string");
}

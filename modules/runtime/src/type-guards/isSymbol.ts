
/**
 * **isSymbol**(value)
 * 
 * Runtime type guard which narrows the passed in type
 * to being a **symbol** when condition is met.
 */
export function isSymbol<T>(value: T): value is T & symbol {
  return (typeof value === "symbol") as T extends symbol 
    ? true 
    : false;
}

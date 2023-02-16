import { ExpandRecursively } from "src/types";

/**
 * **isReadonlyArray**(value)
 * 
 * Type guard to detect if the type is an array (readonly).
 * 
 * Note: at runtime we can't discern between a readonly array
 * and a normal one. If author is aware, however, that an array
 * indicates a readonly array then this type-guard will resolve
 * to a cleaner type.
 */
export function isReadonlyArray<
  T
>(value: unknown | T): value is ExpandRecursively<T & readonly unknown[]> {
  return (Array.isArray(value) === true);
}

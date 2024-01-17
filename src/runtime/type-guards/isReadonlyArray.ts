import { Tuple } from "src/types/index";

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
>(value: T): value is Readonly<Exclude<T, undefined | string | null | boolean | number>> & Tuple {
  return (Array.isArray(value) === true);
}

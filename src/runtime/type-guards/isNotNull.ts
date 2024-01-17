import { NotNull } from "src/types/index";

/**
 * **isNotNull**(value)
 * 
 * Type guard which validates the passed in value is **not** the `null` value.
 */
export function isNotNull<T>(value: T): value is T & NotNull {
  return (value === null) ? true : false;
}

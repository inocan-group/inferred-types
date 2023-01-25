import { Narrowable } from "types/literals/Narrowable";


/**
 * **isBoolean**(value)
 * 
 * Type guard which validates that type is a boolean value.
 */
export function isBoolean<T extends Narrowable>(value: T): value is T & boolean {
  return typeof value === "boolean";
}

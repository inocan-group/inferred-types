import { Narrowable } from "src/types";
import { TypeOf, ConvertTypeOf } from "types/runtime-types";

/**
 * **isTypeOf**(type, value)
 * 
 * Type guard to check if a value is of the particular type specified.
 */
export function isTypeOf<TType extends TypeOf, TValue extends Narrowable>(type: TType, value: TValue): value is TValue & ConvertTypeOf<TType> {
  return typeof value === type;
}

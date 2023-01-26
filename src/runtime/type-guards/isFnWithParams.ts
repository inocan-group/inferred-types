
import { AnyFunction } from "types/functions/function-types";
import { keys } from "runtime/dictionary/keys";
import { isTypeOf } from "runtime/type-guards/higher-order/isTypeOf";
import { AnyObject } from "src/types/boolean-logic/object";

/**
 * **isFnWithDict**(input)
 *  
 * Type guard which checks whether a give variable is a function
 * which _also_ contains 
 */
export function isFnWithParams<
  TFn extends AnyFunction<AnyObject>,
>(input: unknown): input is TFn {

  return isTypeOf("function", input) && keys(input)?.length > 0;
}

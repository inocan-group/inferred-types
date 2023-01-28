import { AnyObject, AnyFunction } from "../../types";
import { keys } from "../dictionary";
import { isTypeOf } from "./higher-order";

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

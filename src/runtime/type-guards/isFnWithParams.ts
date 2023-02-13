import {  AnyFunction } from "src/types";
import { keys } from "../dictionary";
import { isTypeOf } from "./higher-order";

/**
 * **isFnWithDict**(input)
 *  
 * Type guard which checks whether a give variable is a function
 * which _also_ contains 
 */
export function isFnWithParams<
  TFn extends AnyFunction,
>(input: unknown): input is TFn {

  return isTypeOf("function", input) && keys(input)?.length > 0;
}

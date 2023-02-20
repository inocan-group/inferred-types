import { Scalar } from "src/types/base-types";
import { ToFn } from "src/types/functions";

/**
 * **isFnWithDict**(input)
 *  
 * Type guard which checks whether a give variable is a function
 * which _also_ contains 
 */
export function isFnWithParams<T>(input: T): input is Exclude<T, Scalar | undefined> & ToFn<Exclude<T, Scalar | undefined>> {
  return typeof input === "function" && Object.keys(input)?.length > 0;
}

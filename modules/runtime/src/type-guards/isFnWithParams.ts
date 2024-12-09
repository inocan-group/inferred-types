import { Scalar , ToFn } from "inferred-types/types";

/**
 * **isFnWithDict**(input)
 *
 * Type guard which checks whether a give variable is a function
 * which _also_ contains
 */
export function isFnWithParams<T>(input: T): input is Exclude<T, Scalar | undefined> & ToFn<Exclude<T, Scalar | undefined>> {
  return typeof input === "function" && Object.keys(input)?.length > 0;
}

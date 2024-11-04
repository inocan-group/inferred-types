import { isConstant } from "@inferred-types/runtime"


/**
 * **isNever**(val)
 *
 * Type guard which checks for the runtime constant `Never`
 * (which also has a _type_ of **never**).
 */
export const isNever = (val: unknown): val is never => {
  return isConstant(val) && val.kind === "never";
}

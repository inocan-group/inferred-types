import { isString } from "../isString"

/**
 * Higher order type guard which:
 *
 * - takes a set of string literals on first call
 * - second call is the type which validates that the value passed in
 * is the defined set of values of the first call
 */
export function isStringLiteral<TLit extends readonly string[]>(...literals: TLit) {
  return (val: unknown): val is TLit[number] => {
    return isString(val) && literals.includes(val)
  }
}

import { Integer } from "inferred-types/types"

/**
 * Converts the number `n` to a `Integer` type if
 * `n` _is_ an Integer, otherwise throws a `InvalidNumber` error.
 */
export function toInteger(n: number): Integer {
  if (!Number.isInteger(n)) {
    const err = new Error(`Non-floating point number passed to toInteger(${n})`);
    err.name = "InvalidNumber";
    throw err;
  }
  return n as Integer;
}

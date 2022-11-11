export type IsBoolean<T> = T extends boolean ? true : false;

/**
 * Runtime and type checks whether a variable is a boolean value.
 */
export function isBoolean<T extends any>(i: T) {
  return (typeof i === "boolean") as IsBoolean<T>;
}

/**
 * **ifBoolean**
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * a _boolean_ and returns one of two values (strongly typed) based on the evaluation
 * of this criteria.
 *
 * @param val the value being tested
 * @param ifVal the value (strongly typed) returned if val is _boolean_
 * @param elseVal the value (strongly typed) returned if val is NOT a _boolean
 */
export function ifBoolean<T, IF, ELSE>(val: T, ifVal: IF, elseVal: ELSE) {
  return (isBoolean(val) ? ifVal : elseVal) as IsBoolean<T> extends true ? IF : ELSE;
}

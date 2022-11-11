export type IsNumber<T> = T extends number ? true : false;

export function isNumber<T>(i: T) {
  return (typeof i === "number") as T extends number ? true : false;
}

/**
 * **ifNumber**
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * a _number_ and returns one of two values (strongly typed) based on the evaluation
 * of this criteria.
 *
 * @param val the value being tested
 * @param ifVal the value (strongly typed) returned if val is number
 * @param elseVal the value (strongly typed) returned if val is NOT a number
 */
export function ifNumber<T, IF, ELSE>(val: T, ifVal: IF, elseVal: ELSE) {
  return (isNumber(val) ? ifVal : elseVal) as IsNumber<T> extends true ? IF : ELSE;
}

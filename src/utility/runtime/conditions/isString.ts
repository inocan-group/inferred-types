export type IsString<T> = T extends string ? true : false;

export function isString<T>(i: T) {
  return (typeof i === "string") as IsString<T>;
}

/**
 * **ifString**
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * a _string_ and returns one of two values (strongly typed) based on the evaluation
 * of this criteria.
 *
 * @param val the value being tested
 * @param ifVal the value (strongly typed) returned if val is _string_
 * @param elseVal the value (strongly typed) returned if val is NOT a _string
 */
export function ifString<T, IF, ELSE>(val: T, ifVal: IF, elseVal: ELSE) {
  return (isString(val) ? ifVal : elseVal) as IsString<T> extends true ? IF : ELSE;
}

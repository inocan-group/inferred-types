export type IsNull<T> = T extends null ? true : false;

export function isNull<T>(i: T) {
  return (i === null) as T extends null ? true : false;
}

/**
 * **ifNull**
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * Null and returns one of two values (strongly typed) based on the evaluation
 * of this criteria.
 *
 * @param val the value being tested
 * @param ifVal the value (strongly typed) returned if val is `null`
 * @param elseVal the value (strongly typed) returned if val is NOT `null`
 */
export function ifNull<T, IF, ELSE>(val: T, ifVal: IF, elseVal: ELSE) {
  return (isNull(val) ? ifVal : elseVal) as IsNull<T> extends true ? IF : ELSE;
}

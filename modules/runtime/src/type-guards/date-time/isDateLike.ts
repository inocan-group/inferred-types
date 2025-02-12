import { isInteger, isIsoDate, isIsoDateTime, isNumber, isObject, isString } from "inferred-types/runtime";

/**
 * A type guard which checks if `val` is _date like_:
 *
 * - a number (or `NumberLike`) and therefore assumed to be an Epoch timestamp
 * - a string in the shape of the ISO 8601 specification
 * - an object in the shape of:
 *    - Javascript Date object
 *    - DateFNS Date object
 *    - MomentJS Date object
 *    - Luxon Date object
 */
export function isDateLike(val: unknown) {
  return (
    (isNumber(val) && isInteger(val) && val > 0)
    || (isString(val) && (isIsoDate(val) || isIsoDateTime(val)))
    || (isObject(val))
  );
}

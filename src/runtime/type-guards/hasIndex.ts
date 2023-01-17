import { keys } from "../keys";
import { isNumber } from "./isNumber";
import { isObject } from "./isObject";
import { isReadonlyArray } from "./isReadonlyArray";
import { isString } from "./isString";

/**
 * **hasIndex**(value, idx)
 * 
 * Checks whether an object or array has a given index value.
 */
export function hasIndex<
  TValue extends Record<TIndex, any> | any[],
  TIndex extends string | number, 
>(value: unknown, idx: TIndex): value is TValue {
  return (
    isReadonlyArray(value) && isNumber(idx)
  ) || (
    isObject(value) && isString(idx) && keys(value).includes(idx)
  ) ? true : false;
}

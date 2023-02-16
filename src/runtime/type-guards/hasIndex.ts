import { AnyObject, Key } from "src/types";
import { isSymbol } from "../boolean-logic";
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
  TValue extends AnyObject | unknown[],
  TIndex extends Key, 
>(value: unknown, idx: TIndex): value is TValue {
  return (
    isReadonlyArray(value) && isNumber(idx)
  ) || (
    isObject(value) && (isString(idx) || isSymbol(idx)) && idx in value
  ) ? true : false;
}

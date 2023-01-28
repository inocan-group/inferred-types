import { IndexOf , Narrowable } from "../../types";
import { Never } from "../runtime/Never";
import { isArray, isNull, isObject } from "../type-guards";

/**
 * **indexOf**(val, index)
 * 
 * A dereferencing utility which receives a **value** and an **index** and then
 * returns `value[idx]`. 
 * 
 * - Intended to be primarily used for arrays and objects but can receive any type
 * for the _value_ property.
 * - If the _index_ is passed in as a `null` value then no dereferencing will be done
 * and it will simply pass back the _value_.
 */
export function indexOf<
TValue extends Narrowable,
TIdx extends string | number | null
>(val: TValue, index: TIdx) {
  return (
    isNull(index)
    ? val
    : isArray(val)
      ? Number(index) in val ? val[Number(index)] : Never
      : isObject(val) 
        ? String(index) in val ? val[String(index)] : Never
        : Never
  ) as IndexOf<TValue,TIdx>;
}

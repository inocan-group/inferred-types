import { IndexOf , Scalar } from "src/types";
import { Indexable } from "src/types/base-types/Indexable";
import { Never } from "../runtime/Never";
import { isArray, isNull, isNumber, isObject } from "../type-guards";

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
 * - If an array is passed in, you are allowed to use negative values to dereference
 * off the back of the array.
 */
export function indexOf<
TValue extends Indexable | Scalar,
TIdx extends PropertyKey | null
>(val: TValue, index: TIdx) {
  const isNegative = isNumber(index) && index < 0;
  if(isNegative && !Array.isArray(val)) {
    throw new Error(`The indexOf(val,idx) utility received a negative index value [${index}] but the value being de-references is not an array [${typeof val}]!`);
  }
  if(isNegative && Array.isArray(val) && val.length < Math.abs(index)) {
    throw new Error(`The indexOf(val,idx) utility received a negative index of ${index} but the length of the array passed in is only ${val.length}! This is not allowed.`);
  }
  
  /** real index after considering negative indexing */
  const idx = isNegative && Array.isArray(val)
    ? val.length + 1 - Math.abs(index)
    : index;

  return (
    isNull(idx)
    ? val
    : isArray(val)
      ? Number(idx) in val ? val[Number(idx)] : Never
      : isObject(val) 
        ? String(idx) in val ? val[String(idx) as keyof TValue] : Never
        : Never
  ) as IndexOf<TValue,TIdx>;
}

import type {
  IndexOf,
  Narrowable,
  ObjectKey,
  Tuple,
} from "inferred-types/types";
import {
  errCondition,
  isArray,
  isNull,
  isNumber,
  isObject,
} from "inferred-types/runtime";

/**
 * **indexOf**(val, index)
 *
 * A dereferencing utility which receives a **value** and an **index** and then
 * returns `value[idx]`.
 *
 * - If the _index_ is passed in as a `null` value then no dereferencing will be done
 * and it will simply pass back the _value_.
 * - If an array is passed in, you are allowed to use negative values to dereference
 * off the back of the array.
 */
export function indexOf<
  TContainer extends Narrowable | Tuple,
  TIdx extends PropertyKey | null,
>(val: TContainer, index: TIdx) {
  const isNegative = isNumber(index) && index < 0;
  if (isNegative && !Array.isArray(val)) {
    throw new Error(`The indexOf(val,idx) utility received a negative index value [${index}] but the value being de-references is not an array [${typeof val}]!`);
  }
  if (isNegative && Array.isArray(val) && val.length < Math.abs(index)) {
    throw new Error(`The indexOf(val,idx) utility received a negative index of ${index} but the length of the array passed in is only ${val.length}! This is not allowed.`);
  }

  /** real index after considering negative indexing */
  const idx = isNegative && Array.isArray(val)
    ? val.length + 1 - Math.abs(index)
    : index;

  return (
    index === null
      ? val
      : isNull(idx)
        ? val
        : isArray(val)
          ? Number(idx as PropertyKey) in val
            ? val[Number(idx)]
            : errCondition("invalid-index", `attempt to index a numeric array with an invalid index: ${Number(idx)}`)
          : isObject(val)
            ? String(idx as ObjectKey) in val
              ? val[String(idx) as ObjectKey]
              : errCondition("invalid-index", `attempt to index a dictionary object with an invalid index: ${String(idx)}`)
            : errCondition("invalid-container-type", `Attempt to use indexOf() on an invalid container type: ${typeof val}`)
  ) as unknown as IndexOf<TContainer, TIdx>;
}

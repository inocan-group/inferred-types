import {  isArray, isObject } from "src/runtime";


/**
 * **hasIndexOf**(value, idx) => boolean
 * 
 */
export const hasIndexOf = <
  TValue extends Container,
  TIndex extends PropertyKey
>(value: TValue, idx: TIndex): value is TValue & Record<TIndex, unknown> => {
  return (isObject(value) || isArray(value)) && idx in value;
};

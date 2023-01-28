import { Narrowable } from "../../types";
import { isArray } from "./isArray";
import { isObject } from "./isObject";
import { isString } from "./isString";

export const hasIndexOf = <
  TValue extends Narrowable,
  TIndex extends string | number
>(value: TValue, idx: TIndex): value is TValue & Record<TIndex, any> => {
  return (
    (isArray(value) && Number(idx) in value) ||
    (isObject(value) && isString(idx) && idx in value)
  ) ? true : false;
};

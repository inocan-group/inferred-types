import { Tuple, Length } from "src/types";
import { isArray } from "./isArray";
import { isObject } from "./isObject";
import { isString } from "./isString";

export const hasIndexOf = <
  TValue,
  TIndex extends string | number
>(value: TValue, idx: TIndex): value is TIndex extends number 
  ? TValue & Tuple<unknown, Length<TValue & readonly unknown[]>>
  : TValue & Record<TIndex, unknown> => {
  return (
    (isArray(value) && Number(idx) in value) ||
    (isObject(value) && isString(idx) && idx in value)
  ) ? true : false;
};

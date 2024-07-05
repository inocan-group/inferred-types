import {
  If,
  IsArray,
  IfLength,
  Narrowable,
  Scalar,
  Tuple
} from "src/types/index";

/**
 * **ifLength**(val,length, ifVal, elseVal)
 *
 * Runtime utility which tests whether the `value` passed in is both an array/tuple
 * and that it's length is equal to `length`. It then provides two callbacks with
 * narrowed types for these two conditions.
 *
 * @param value the value being tested
 * @param ifVal the value (strongly typed) returned if val is of appropriate length
 * @param elseVal the value (strongly typed) returned if val is NOT of given length
 */
export function ifLength<
  TList extends readonly unknown[],
  TLen extends number,
  IF extends Narrowable | Tuple,
  ELSE extends Narrowable | Tuple,
>(
  value: TList,
  length: TLen,
  ifVal: <V extends Exclude<TList, Scalar | undefined> & Tuple>(v: V) => IF,
  elseVal: <V extends If<IsArray<TList>, TList, Exclude<TList, Tuple>>>(v:V) => ELSE
) {
  return (
    Array.isArray(value) && (value as unknown[]).length === length

      ? ifVal(value as any)
      : elseVal(value as Exclude<TList, Tuple>)
  ) as unknown as IfLength<TList, TLen, IF, ELSE>;
}


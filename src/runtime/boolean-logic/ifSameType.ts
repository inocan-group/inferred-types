import { Narrowable } from "src/types/index";

/**
 * **ifSameType**(value, comparisonType, ifExtends, doesNotExtend)
 * 
 * Runtime utility function which compares the variable `value` to a comparison type
 * and based on whether they are the same type, it will call one of the two provided
 * callback functions: `ifExtends` or `doesNotExtend`.
 */
export function ifSameType<
  TValue extends Narrowable,
  TType extends string | number | boolean | object,
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  value: TValue,
  comparisonType: TType,
  ifExtends: <T extends TType & TValue>(v: T) => IF,
  doesNotExtend: <T extends Exclude<TValue, TType>>(v: T) => ELSE
) {
  return (
    // runtime values match
    (
      typeof value === typeof comparisonType 
        ? ifExtends(value as TType & TValue) 
        : doesNotExtend(value as Exclude<TValue, TType>)
    ) as TValue extends TType ? IF : ELSE
  );
}

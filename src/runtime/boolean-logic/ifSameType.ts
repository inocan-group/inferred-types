import { Narrowable,  Widen } from "src/types";

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
    ) as Widen<TValue> extends Widen<TType> ? IF : ELSE
  );
}

import { Narrowable, Not, Widen } from "src/types";

export function ifSameType<
  TValue extends Narrowable,
  TType extends string | number | boolean | object,
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  value: TValue,
  comparisonType: TType,
  ifExtends: <T extends TType>(v: T & TValue) => IF,
  doesNotExtend: (v: Not<TValue, TType>) => ELSE
) {
  return (
    // runtime values match
    (
      typeof value === typeof comparisonType ? ifExtends(value as any) : doesNotExtend(value as any)
    ) as Widen<TValue> extends Widen<TType> ? IF : ELSE
  );
}

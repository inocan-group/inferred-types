import { Narrowable } from "inferred-types/dist/types/index";

/**
 * **ifSameType**(value, comparator, same, notSame)
 *
 * Runtime utility function which compares the variable `value` to a comparison type
 * and based on whether they are the same type, it will call one of the two provided
 * callback functions: `same` or `notSame`.
 */
export function ifSameType<
  TValue extends Narrowable,
  TType extends string | number | boolean | object,
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  value: TValue,
  comparator: TType,
  same: <T extends TType & TValue>(v: T) => IF,
  notSame: <T extends Exclude<TValue, TType>>(v: T) => ELSE
) {
  return (
    // runtime values match
    (
      typeof value === typeof comparator
        ? same(value as TType & TValue)
        : notSame(value as Exclude<TValue, TType>)
    ) as TValue extends TType ? IF : ELSE
  );
}

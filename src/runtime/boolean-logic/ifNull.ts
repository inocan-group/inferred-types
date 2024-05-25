import type { IsNull, Narrowable } from "src/types/index";
import { isNull } from "src/runtime/index";



/**
 * **ifNull**(val,IF,ELSE)
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * Null and returns one of two values (strongly typed) based on the evaluation
 * of this criteria.
 *
 * @param val the value being tested
 * @param ifVal callback fn which responds when _val_ is **null**
 * @param elseVal callback fn which responds when _val_ is not **null**
 */
export function ifNull<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  val: T,
  ifVal: () => IF,
  elseVal: (v: Exclude<T, null>) => ELSE
) {
  return (
    isNull(val)
      ? ifVal()
      : elseVal(val as unknown as Exclude<T, null>)
  ) as IsNull<T> extends true ? IF : ELSE;
}

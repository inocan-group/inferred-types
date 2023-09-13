import type { IfNull, Narrowable } from "../../types/base";
import { isNull } from "src/runtime";

/**
 * **ifNotNull**(val,IF,ELSE)
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * Null and returns one of two values (strongly typed) based on the evaluation
 * of this criteria.
 *
 * @param val the value being tested
 * @param ifVal callback fn which responds when _val_ is **null**
 * @param elseVal callback fn which responds when _val_ is not **null**
 */
export function ifNotNull<
  T extends Narrowable, 
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  val: T,
  ifVal: (v: Exclude<T, null>) => IF,
  elseVal: () => ELSE
) {
  return (
    isNull(val) 
    ? elseVal()
    : ifVal(val as Exclude<T, null>)
  ) as unknown as IfNull<T, IF, ELSE>;
}

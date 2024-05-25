import { Narrowable, IsBoolean } from "src/types/index";
import { isBoolean } from "src/runtime/index";


/**
 * **ifBoolean**
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * a _boolean_ and returns one of two values (strongly typed) based on the evaluation
 * of this criteria.
 *
 * @param val the value being tested
 * @param ifBoolean the value (strongly typed) returned if val is _boolean_
 * @param notBoolean the value (strongly typed) returned if val is NOT a _boolean
 */
export function ifBoolean<
  TContent extends Narrowable,
  TIf extends Narrowable,
  TElse extends Narrowable
>(
  val: TContent,
  ifBoolean: <V extends boolean>(v: V & TContent) => TIf,
  notBoolean: <V extends Exclude<TContent, boolean>>(v: V) => TElse
) {
  return (
    isBoolean(val)
      ? ifBoolean(val as TContent & boolean)
      : notBoolean(val as Exclude<TContent, boolean>)
  ) as unknown as [IsBoolean<TContent>] extends [true] ? TIf : TElse;
}

import { IfFalse, IsFalse } from "types/boolean-logic/boolean";
import { Narrowable } from "types/literals/Narrowable";

export function isFalse<T>(i: T) {
  return (typeof i === "boolean" && !i) as IsFalse<T>;
}

/**
 * **ifTrue**
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * a _true_ and returns one of two values (strongly typed) based on the evaluation
 * of this criteria.
 *
 * @param val the value being tested
 * @param ifVal the value (strongly typed) returned if val is _true_ value
 * @param elseVal the value (strongly typed) returned if val is NOT a _true_ value
 *
 * Note: at runtime there's no way to distinguish if the value was widely or loosely
 * typed so unlike the type utility there is no "MAYBE" state but if a wide type if
 * encountered the _type_ will the union of `IF` and `ELSE`.
 */
export function ifFalse<T extends boolean, IF extends Narrowable, ELSE extends Narrowable>(
  val: T,
  ifVal: IF,
  elseVal: ELSE
) {
  return (isFalse(val) ? ifVal : elseVal) as IfFalse<T, IF, ELSE, IF | ELSE>;
}

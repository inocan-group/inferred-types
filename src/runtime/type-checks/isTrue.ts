import { IfTrue, IsTrue } from "src/types/boolean-logic";
import { Narrowable } from "src/types/Narrowable";

/**
 * Run-time and type checking of whether a variable is `true`.
 */
export function isTrue<T extends Narrowable>(i: T) {
  return (typeof i === "boolean" && i === true) as IsTrue<T>;
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
 * typed so unlike the type utility there is no "MAYBE" state
 */
export function ifTrue<T extends Narrowable, IF extends Narrowable, ELSE extends Narrowable>(
  val: T,
  ifVal: IF,
  elseVal: ELSE
) {
  return (isTrue(val) ? ifVal : elseVal) as IsTrue<T> extends true ? IF : ELSE as IfTrue<
    T,
    IF,
    ELSE,
    IF | ELSE
  >;
}

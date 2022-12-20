import { AfterFirst, First } from "../lists";
import { Narrowable } from "../Narrowable";
import { IfTrue } from "./boolean";
import { IfSomeEqual } from "./equivalency";
import { IfLiteral } from "./IsLiteral";

/**
 * **Truthy**`<T>`
 * 
 * A type utility which evaluates `T` for _[truthiness](https://frontend.turing.edu/lessons/module-1/js-truthy-falsy-expressions.html)_ and returns `true` or `false`
 * where the state can be detected at design time; otherwise returns `boolean`.
 * 
 * **See Also:** `IfTruthy`, `IfSomeTruthy`, `IfAllTruthy`, and `TruthyReturns`
 */
export type Truthy<T> = //
  T extends string
    ? T extends "" ? false : IfLiteral<T, true, boolean>
  : T extends number
    ? IfLiteral<T, IfSomeEqual<T, [0, -0], false, true>, boolean>
    : T extends boolean
      ? T extends false ? false : IfLiteral<T, true, boolean>
      : IfSomeEqual<T, [null, undefined, typeof NaN], false, boolean>;

/**
 * **IfTruthy**`<T,IF,ELSE,MAYBE>`
 * 
 * A type utility which evaluates `T` for _[truthiness](https://frontend.turing.edu/lessons/module-1/js-truthy-falsy-expressions.html)_ and returns `IF` when true and `ELSE` if not. 
 * 
 * If it's not sure -- meaning it there are wide types which make design time 
 * evaluation impossible -- then the MAYBE type is returned.
 */
export type IfTruthy<
  T, 
  TRUE extends Narrowable, 
  FALSE extends Narrowable, 
  MAYBE extends Narrowable = unknown
> = Truthy<T> extends true ? TRUE : Truthy<T> extends false ? FALSE : MAYBE;

/**
 * **IfSomeTruthy**`<TValues,IF,ELSE,MAYBE>`
 * 
 * A type utility which evaluates all the values in `TValues` for _[truthiness](https://frontend.turing.edu/lessons/module-1/js-truthy-falsy-expressions.html)_ and 
 * returns `TRUE` type when at least one is truthy, the `FALSE` type when none are, 
 * and the `MAYBE` type when the truthiness is not known at design time.
 */
export type IfSomeTruthy<
  TValues extends readonly any[],
  IF extends Narrowable, 
  ELSE extends Narrowable, 
  MAYBE extends Narrowable = unknown,
  IsUnknown extends boolean = false
> = //
[] extends TValues
  ? IfTrue<IsUnknown, MAYBE, ELSE, MAYBE>
  : IfTruthy<
    First<TValues>, 
    true, 
    IfSomeTruthy<AfterFirst<TValues>, IF, ELSE, MAYBE, IsUnknown>,
    IfSomeTruthy<AfterFirst<TValues>, IF, ELSE, MAYBE, true>
  >;
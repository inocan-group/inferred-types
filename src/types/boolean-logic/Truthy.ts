import { Narrowable } from "../Narrowable";
import { IfSomeEqual, SomeEqual } from "./equivalency";
import { IfLiteral } from "./IsLiteral";

/**
 * **Truthy**`<T>`
 * 
 * A type utility which evaluates `T` for _[truthiness](https://frontend.turing.edu/lessons/module-1/js-truthy-falsy-expressions.html)_ and returns `true` or `false`
 * where the state can be detected at design time; otherwise returns `boolean`.
 * 
 * **See Also:** `IfTruthy`, `IfSomeTruthy`, `IfAllTruthy`
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
 * **IfTruthy**`<T>`
 * 
 * A type utility which evaluates `T` for _[truthiness](https://frontend.turing.edu/lessons/module-1/js-truthy-falsy-expressions.html)_ and returns `IF` when true and `ELSE` if not. 
 * 
 * If it's not sure -- meaning it there are wide types which make design time 
 * evaluation impossible -- then the MAYBE type is returned.
 */
export type IfTruthy<
  T, 
  IF extends Narrowable, 
  ELSE extends Narrowable, 
  MAYBE extends Narrowable = ELSE
> = Truthy<T> extends true ? IF : Truthy<T> extends false ? ELSE : MAYBE;
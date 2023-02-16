import { AfterFirst, First } from "src/types/lists";
import { IfTrue } from "../IfTrue";
import { IfTruthy } from "./IfTruthy";

/**
 * **IfSomeTruthy**`<TValues,IF,ELSE,MAYBE>`
 * 
 * A type utility which evaluates all the values in `TValues` for _[truthiness](https://frontend.turing.edu/lessons/module-1/js-truthy-falsy-expressions.html)_ and 
 * returns `TRUE` type when at least one is truthy, the `FALSE` type when none are, 
 * and the `MAYBE` type when the truthiness is not known at design time.
 */
export type IfSomeTruthy<
  TValues extends readonly unknown[],
  IF, 
  ELSE, 
  MAYBE = unknown,
  IsUnknown extends boolean = false
> = //
[] extends TValues
  ? IfTrue<IsUnknown, MAYBE, ELSE>
  : IfTruthy<
    First<TValues>, 
    true, 
    IfSomeTruthy<AfterFirst<TValues>, IF, ELSE, MAYBE, IsUnknown>,
    IfSomeTruthy<AfterFirst<TValues>, IF, ELSE, MAYBE, true>
  >;

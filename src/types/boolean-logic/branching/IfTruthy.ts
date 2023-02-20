import { IsTruthy } from "src/types/boolean-logic";

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
  TRUE, 
  FALSE, 
  MAYBE = unknown
> = IsTruthy<T> extends true 
  ? TRUE 
  : IsTruthy<T> extends false 
    ? FALSE 
    : MAYBE;

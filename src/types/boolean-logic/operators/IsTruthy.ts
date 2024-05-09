import { IfBooleanLiteral, IfNumericLiteral, IfSomeEqual, IfStringLiteral } from "src/types/index";


/**
 * **Truthy**`<T>`
 * 
 * A type utility which evaluates `T` for _[truthiness](https://frontend.turing.edu/lessons/module-1/js-truthy-falsy-expressions.html)_ and returns `true` or `false`
 * where the state can be detected at design time; otherwise returns `boolean`.
 * 
 * **See Also:** `IfTruthy`, `IfSomeTruthy`, `IfAllTruthy`, and `TruthyReturns`
 */
export type IsTruthy<T> = //
  T extends string
    ? T extends "" ? false : IfStringLiteral<T, true, boolean>
  : T extends number
    ? IfNumericLiteral<T, IfSomeEqual<[0, -0],T,  false, true>, boolean>
    : T extends boolean
      ? T extends false ? false : IfBooleanLiteral<T, true, boolean>
      : IfSomeEqual<[null, undefined, typeof NaN],T, false, boolean>;

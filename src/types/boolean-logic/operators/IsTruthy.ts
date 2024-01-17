import { IfLiteral, IfSomeEqual } from "src/types/index";


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
    ? T extends "" ? false : IfLiteral<T, true, boolean>
  : T extends number
    ? IfLiteral<T, IfSomeEqual<T, [0, -0], false, true>, boolean>
    : T extends boolean
      ? T extends false ? false : IfLiteral<T, true, boolean>
      : IfSomeEqual<T, [null, undefined, typeof NaN], false, boolean>;

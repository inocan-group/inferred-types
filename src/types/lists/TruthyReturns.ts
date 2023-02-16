import { IfTruthy } from "../boolean-logic/IsTruthy";
import { AnyFunction } from "src/types/base-types";
import { TupleToUnion } from "../type-conversion/TupleToUnion";

/**
 * **TruthyReturns**`<T>`
 * 
 * Given a known Tuple, this utility will return a _union_ type
 * that represents the _[truthiness](https://frontend.turing.edu/lessons/module-1/js-truthy-falsy-expressions.html)_
 * of each element; where:
 * 
 * - functions are evaluated by their _return type_
 * - non-functions are evaluated directly
 * 
 * **Note:** `true` and `false` will be returned where possible but in cases where
 * a type can't be evaluated at design time then `boolean` will be returned.
 * 
 * **See Also**: `ReturnTypes` and `LogicalReturns`
 */
export type TruthyReturns<T extends readonly any[]> = TupleToUnion<{
  [K in keyof T]: //
    T[K] extends AnyFunction
      ? IfTruthy<ReturnType<T[K]>, true, false, boolean>
      : IfTruthy<T[K], true, false, boolean>;
}>;

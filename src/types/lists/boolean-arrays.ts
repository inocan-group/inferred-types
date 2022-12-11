import { AnyFunction } from "src/runtime/type-checks/isFunction";
import { IfTruthy, Truthy } from "../boolean-logic/Truthy";
import { TupleToUnion } from "../type-conversion";


/**
 * **ReturnTypes**`<T>`
 * 
 * Given any Tuple, this utility will return a _union_ type 
 * that represents all the possible _return types_ from functions found
 * in the array. Non-function types will be ignored as will functions
 * which don't return a boolean value.
 * 
 * **See Also**: `LogicalReturns` and `TruthyReturns`
 */
export type ReturnTypes<T extends readonly any[]> = TupleToUnion<{
  [K in keyof T]: T[K] extends AnyFunction
    ? ReturnType<T[K]> extends boolean
      ? ReturnType<T[K]>
      : never
    : never;
}>;

/**
 * **LogicalReturns**`<T>`
 * 
 * Given a known Tuple, this utility will return a _union_ type
 * that represents all boolean values _or_ any functions with a
 * boolean return type. Other values will be disregarded.
 * 
 * **See Also**: `ReturnTypes` and `TruthyReturns`
 */
export type LogicalReturns<T extends readonly any[]> = TupleToUnion<{
  [K in keyof T]: //
    T[K] extends AnyFunction
      ? ReturnType<T[K]> extends boolean
      ? ReturnType<T[K]>
      : never
    : T[K] extends boolean
      ? T[K]
      : never;
}>;


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
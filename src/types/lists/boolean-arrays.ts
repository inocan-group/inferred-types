import { AnyFunction } from "src/runtime/type-checks/isFunction";
import { IfBoolean } from "../boolean-logic/boolean";
import { IfTruthy } from "../boolean-logic/Truthy";
import { LogicFunction } from "../functions";
import { TupleToUnion } from "../type-conversion";
import { AfterFirst } from "./AfterFirst";
import { FilterTuple } from "./FilterTuple";
import { First } from "./First";


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
export type ReturnTypes<T extends readonly any[]> = {
  [K in keyof T]: T[K] extends AnyFunction
    ? ReturnType<T[K]> extends boolean
      ? ReturnType<T[K]>
      : never
    : never;
};

/**
 * **LogicalReturns**`<TValues, TParams>`
 * 
 * Given a known Tuple, this utility will return a _union_ type
 * that represents all boolean values _or_ any functions with a
 * boolean return type. Other values will be set to a `null` value
 * to preserve order in cases where it matters.
 * 
 * To allow finer grain resolution with generics you may state
 * a signature for the functions as `TParams` and if there is
 * a match there then the generics you pass in will refine the
 * return type.
 * 
 * **See Also**: `ReturnTypes` and `TruthyReturns`
 */
export type LogicalReturns<
  TValues extends readonly any[],
  TParams extends readonly any[] = []
// eslint-disable-next-line no-use-before-define
> = ProcessLogicalReturns<FilterTuple<TValues, [string, number]>, TParams>;

type ProcessLogicalReturns<
  TValues extends readonly any[],
  TParams extends readonly any[] = [],
  TResults extends readonly boolean[] = []
> = [] extends TValues
  ? TResults
  : IfBoolean<
      First<TValues>,
      ProcessLogicalReturns<AfterFirst<TValues>, TParams, [...TResults, First<TValues>]>,
      LogicFunction<TParams> extends First<TValues>
        ? ProcessLogicalReturns<AfterFirst<TValues>, TParams, [...TResults, ReturnType<LogicFunction<TParams>>]>
        : ReturnType<First<TValues>> extends boolean
          ? ProcessLogicalReturns<AfterFirst<TValues>, TParams, [...TResults, ReturnType<First<TValues>>]>
          : ProcessLogicalReturns<AfterFirst<TValues>, TParams, [...TResults]>
    >;

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
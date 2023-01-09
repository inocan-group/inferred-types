import { IfBoolean } from "../boolean-logic/boolean";
import { IfTruthy } from "../boolean-logic/Truthy";
import { AnyFunction, LogicFunction } from "../functions";
import { TupleToUnion } from "../type-conversion";
import { AfterFirst } from "./AfterFirst";
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
 * Given a known tuple of values, this utility will reduce it to
 * another Tuple of items which are either a boolean type or a function
 * with a boolean return. In the latter case the function's return value
 * will be represented in the Tuple.
 * 
 * **See Also**: `ReturnTypes` and `TruthyReturns`
 */
export type LogicalReturns<
  TValues extends readonly any[],
  TParams extends readonly any[] = []
// eslint-disable-next-line no-use-before-define
> = ProcessLogicalReturns<TValues, TParams>;

type ProcessLogicalReturns<
  TValues extends readonly any[],
  TParams extends readonly any[] = [],
  TResults extends readonly boolean[] = []
> = [] extends TValues
  ? TResults
  : IfBoolean<
      First<TValues>,
      // boolean value
      ProcessLogicalReturns<
        AfterFirst<TValues>, 
        TParams, 
        [...TResults, First<TValues>]
      >,

      LogicFunction<TParams> extends First<TValues>
        ? ProcessLogicalReturns<AfterFirst<TValues>, TParams, [...TResults, ReturnType<LogicFunction<TParams>>]>
        : ReturnType<First<TValues>> extends boolean
          ? ProcessLogicalReturns<
              AfterFirst<TValues>, 
              TParams, 
              [...TResults, ReturnType<First<TValues>>]
            >
          : ProcessLogicalReturns<AfterFirst<TValues>, TParams, TResults>
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

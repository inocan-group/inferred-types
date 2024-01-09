import { IfBoolean , AfterFirst, First, LogicFunction } from "src/types";



type ProcessLogicalReturns<
  TValues extends readonly unknown[],
  TParams extends readonly unknown[] = [],
  TResults extends readonly boolean[] = []
> = [] extends TValues
  ? TResults
  : IfBoolean<
      First<TValues>,
      // boolean value
      ProcessLogicalReturns<
        AfterFirst<TValues>, 
        TParams, 
        [...TResults, First<TValues> & boolean]
      >,
      LogicFunction<TParams> extends First<TValues>
        ? ProcessLogicalReturns<
            AfterFirst<TValues>, 
            TParams, 
            [...TResults, ReturnType<LogicFunction<TParams>>]
          >
        : First<TValues> extends boolean
          ? ProcessLogicalReturns<
              AfterFirst<TValues>, 
              TParams, 
              [...TResults, First<TValues>]
            >
          : ProcessLogicalReturns<AfterFirst<TValues>, TParams, TResults>
    >;


/**
 * **LogicalReturns**`<TValues, TParams>`
 * 
 * Given a known tuple of values, this utility will reduce it to
 * another tuple of items which are either a _boolean type_ or a function
 * with a boolean return. In the latter case the function's return value
 * will be represented in the Tuple.
 * 
 * **See Also**: `ReturnTypes` and `TruthyReturns`
 */
export type LogicalReturns<
  TValues extends readonly unknown[],
  TParams extends readonly unknown[] = []
// eslint-disable-next-line no-use-before-define
> = ProcessLogicalReturns<TValues, TParams>;

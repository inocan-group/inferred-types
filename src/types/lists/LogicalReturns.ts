import { IfBoolean } from "../boolean-logic";
import { LogicFunction } from "../functions/LogicFunction";
import { AfterFirst, First } from "src/types/lists";

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
  TValues extends readonly unknown[],
  TParams extends readonly unknown[] = []
// eslint-disable-next-line no-use-before-define
> = ProcessLogicalReturns<TValues, TParams>;

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

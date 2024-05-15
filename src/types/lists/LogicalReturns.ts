/* eslint-disable @typescript-eslint/no-explicit-any */

import { LogicFunction } from "../functions";

type Process<
TValues extends readonly (boolean | LogicFunction)[],
_TParams extends readonly unknown[] = []
> = {
[K in keyof TValues]: TValues[K] extends ((...args: any[]) => boolean)
  ? ReturnType<TValues[K]>
  : TValues[K]
}


/**
 * **LogicalReturns**`<TValues, TParams>`
 * 
 * Given a known tuple of values, this utility will reduce it to
 * another tuple of items which are either a _boolean type_ or a function
 * with a boolean return. In the latter case the function's return value
 * will be represented in the Tuple.
 * 
 * **Related**: `ReturnTypes` and `TruthyReturns`
 */
export type LogicalReturns<
  TValues extends readonly (boolean | LogicFunction)[],
  _TParams extends readonly unknown[] = []
> = Process<TValues, _TParams> extends readonly boolean[]
? Process<TValues, _TParams>
: never;

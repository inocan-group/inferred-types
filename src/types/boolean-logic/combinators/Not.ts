/* eslint-disable no-use-before-define */
import { Tuple, LogicFunction, IfFalse, IfTrue, IsErrorCondition, AfterFirst, First } from "src/types/index";



type Negate <
  TVal, 
  TParams extends Tuple
> = TVal extends boolean
? IfTrue<TVal, false, IfFalse<TVal, true, boolean>>  
: TVal extends LogicFunction<TParams>
  ? ReturnType<LogicFunction<TParams>>
  : never;

type NegateTuple<
  TTuple extends readonly (boolean | LogicFunction)[],
  TParams extends Tuple,
  TResults extends readonly (boolean | LogicFunction)[] = []
> = [] extends TTuple
? TResults
: NegateTuple<
    AfterFirst<TTuple>,
    TParams,
    [...TResults, Negate<First<TTuple>, TParams> ]
  >;

/**
 * **Not**`<T>`
 * 
 * A boolean negation that can work on both a single value or an
 * array of values.
 * 
 * ```ts
 * // false
 * type Single = Not<true>;
 * // [ false, true, boolean ]
 * type Multi = Not<[true,false,boolean]>;
 * ```
 */
export type Not<
  TVal, 
  TParams extends Tuple = []
> = IsErrorCondition<TVal> extends true 
  ? TVal
  : TVal extends boolean
    ? Negate<TVal,TParams>
    : TVal extends readonly (boolean | LogicFunction)[] 
      ? NegateTuple<TVal, TParams>
      : never;

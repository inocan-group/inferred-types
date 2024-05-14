/* eslint-disable no-use-before-define */
import {  
  LogicFunction,
  IsFalse, 
  IsTrue, 
  IsErrorCondition, 
  AfterFirst, 
  First, 
  IsEqual, 
  IsNever 
} from "src/types/index";



type Negate <
  TVal, 
> = IsNever<TVal> extends true
? never
: [TVal] extends [boolean]
  ? IsTrue<TVal> extends true 
    ? false 
    : IsFalse<TVal> extends true ?  true : boolean 
  : [TVal] extends [LogicFunction]
    ? ReturnType<LogicFunction>
    : never;

type NegateTuple<
  TTuple extends readonly (boolean | LogicFunction)[],
  TResults extends readonly (boolean | LogicFunction)[] = []
> = [] extends TTuple
? IsEqual<TResults, [], false, TResults>
: NegateTuple<
    AfterFirst<TTuple>,
    [...TResults, Negate<First<TTuple>> ]
  >;

/**
 * **Not**`<T,[TError]>`
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
  TError = never
> = IsErrorCondition<TVal> extends true 
  ? TError
  : [IsNever<TVal>] extends [true]
    ? never
    : [TVal] extends [boolean]
      ? Negate<TVal>
      :TVal extends readonly (boolean | LogicFunction)[] 
        ? NegateTuple<TVal>
        : never;

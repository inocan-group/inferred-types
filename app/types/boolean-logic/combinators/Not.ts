
import {
  LogicFunction,
  IsFalse,
  IsTrue,
  AfterFirst,
  First,
  IsEqual,
  IsNever,
  As
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
    ? Negate<ReturnType<LogicFunction>>
    : never;

type NegateTuple<
  TTuple extends readonly (boolean | LogicFunction)[],
  TResults extends readonly (boolean | LogicFunction)[] = []
> = [] extends TTuple
? IsEqual<TResults, [], false, TResults>
: NegateTuple<
    AfterFirst<TTuple>,
    [
      ...TResults,
        First<TTuple> extends LogicFunction
       ? Negate<ReturnType<First<TTuple>>>
       : Negate<First<TTuple>>
    ]
  >;



/**
 * **Not**`<T,[TError]>`
 *
 * A boolean negation that can work on both a single value or an
 * tuple of values.
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
  TNotBoolean extends boolean = false
> = [TVal] extends [boolean]
? Exclude<As<Negate<TVal>, boolean>, any[]>
: [TVal] extends [LogicFunction]
? As<Negate<ReturnType<TVal>>, boolean>
: [TVal] extends [readonly (LogicFunction | boolean)[]]
? As<NegateTuple<TVal>, readonly boolean[]>
: TNotBoolean;



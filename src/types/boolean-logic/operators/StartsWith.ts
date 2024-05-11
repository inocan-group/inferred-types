import {  AsString,  Handle,  If,   IfFalse, IsEqual, IsTuple, IsUnion, Or } from "src/types/index";

type TestThatExtends<
  TValue extends string,
  TComparator extends string
> = [TValue] extends [`${TComparator}${string}`] ? true : false

type Process<
  TValue extends string,
  TComparator extends string
> = IfFalse<TestThatExtends<TValue,TComparator>,false, true>

type ProcessEach<
    TValue extends string,
    TComparator extends readonly string[]
> = Or<{
  [K in keyof TComparator]: Process<TValue,TComparator[K]>
}>;



type PreProcess<
  TValue extends string,
  TComparator extends string | readonly string[]
> = TComparator extends readonly string[]
  ? ProcessEach<TValue, TComparator>
  : TComparator extends string
    ? Process<TValue,AsString<TComparator>>
    : never;

/**
 * **StartsWith**<TValue, TComparator>
 *
 * A type utility which checks whether `TValue` _starts with_ the 
 * value of `TComparator`.
 *
 * - numeric values for `TValue` will be converted into string literals
 * prior to comparison
 * - a tuple value in `TComparator` is allowed and will test whether
 * _any_ of the patterns start `TValue`
 * - a union type for `TComparator` is allowed so long as it's only for a single character
 *    - this can be much more type efficient for unions with lots of characters
 *    - if you need larger pattern matches then use a Tuple for `TComparator`
 */
export type StartsWith<
  TValue extends string | number,
  TComparator extends string | number | readonly string[]
> = If<
  Or<[
    IsEqual<AsString<TValue>, string>,
    IsEqual<AsString<TComparator>, string>
  ]>,
  boolean,
  If<
    IsUnion<TComparator>,
    IfFalse<
      PreProcess<
        AsString<TValue>,
        TComparator extends number
          ? AsString<TComparator>
          : TComparator
        >,
      false,
      true
    >,
    PreProcess<
      AsString<TValue>,
      TComparator extends number
        ? AsString<TComparator>
        : TComparator
    >
  >
>;



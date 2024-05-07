import {  IfUnion, IsStringLiteral, Or, ToString, UnionToTuple } from "src/types/index";

type Process<
  TValue,
  TComparator
> = TComparator extends number 
  ? Process<ToString<TValue>, ToString<TComparator>>
  : TComparator extends string
    ? IsStringLiteral<TComparator> extends true
      ? IsStringLiteral<TValue> extends true // both literals
        ? TValue extends `${TComparator}${string}`
          ? true
          : false
        : boolean
      : boolean
    : TComparator extends readonly unknown[]
      ? Or<{
          [K in keyof TComparator]: Process<TValue,TComparator[K]>
        }>
      : never;

type Unionize<
TValue,
  TComparator
> = IfUnion<
  TComparator,
  Process<TValue,UnionToTuple<TComparator>>,
  Process<TValue,TComparator>
>;

/**
 * **StartsWith**<TValue, TComparator>
 *
 * A type utility which checks whether `TValue` _starts with_ the 
 * value of `TComparator`.
 *
 * - if a tuple is passed in for `TValue` then all values will be logically
 * OR'd together
 * - numeric values for `TValue` will be converted into string literals
 * prior to comparison
 * - a tuple value in `TComparator` is converted to a union type
 */
export type StartsWith<
  TValue,
  TComparator
> = TValue extends number | boolean
? Unionize<ToString<TValue>, TComparator>
: TValue extends string
  ? Unionize<TValue,TComparator>
  : never;


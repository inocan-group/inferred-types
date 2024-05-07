import type { IsStringLiteral, ToString, Or } from "src/types/index";

type Process<
  TValue,
  TComparator
> = TComparator extends number 
  ? Process<ToString<TValue>, ToString<TComparator>>
  : TComparator extends string
    ? IsStringLiteral<TComparator> extends true
      ? IsStringLiteral<TValue> extends true // both literals
        ? TValue extends `${string}${TComparator}`
          ? true
          : false
        : boolean
      : boolean
    : TComparator extends readonly (string|number)[]
      ? Or<{
          [K in keyof TComparator]: Process<TValue,TComparator[K]>
        }>
      : never;

/**
 * **EndsWith**<T,U>
 *
 * A type utility which checks whether `T` _ends with_ the string literal `U`.
 *
 * If both `T` and `U` are string literals then the type system will resolve
 * to a literal `true` or `false` but if either is not a literal that it will
 * just resolve to `boolean` as the value can not be known at design time..
 */
export type EndsWith<
  TValue,
  TEndsWith
> = Process<TValue,TEndsWith>

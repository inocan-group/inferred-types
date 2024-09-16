import { AsNumericArray } from "./AsNumericArray"

type Iterator<n, iterator extends any[] = []> =
  iterator['length'] extends n
    ? iterator
    : Iterator<n, [any, ...iterator]>

type Drop1<xs extends any[]> =
  xs extends [any, ...infer tail] ? tail : []

type LessThanOrEqual<a extends any[], b extends any[]> =
  [a, b] extends [[], [any, ...any]]
    ? true
    : [a, b] extends [[any,...any], []]
    ? false
    : [a, b] extends [[], []]
    ? true
    : LessThanOrEqual<Drop1<a>, Drop1<b>>

type GreaterThan<a extends any[], b extends any[]> =
  [a, b] extends [[], [any, ...any]]
    ? false
    : [a, b] extends [[any,...any], []]
    ? true
    : [a, b] extends [[], []]
    ? false
    : GreaterThan<Drop1<a>, Drop1<b>>


type FilterLessThanOrEqual<value, xs extends any[], output extends any[] = []> =
  xs extends [infer head, ...infer tail]
    ? LessThanOrEqual<Iterator<value>, Iterator<head>> extends true
      ? [...output, head, ...FilterLessThanOrEqual<value, tail, output>]
      : [...output, ...FilterLessThanOrEqual<value, tail, output>]
    : []

type FilterGreaterThan<value, xs extends any[], output extends any[] = []> =
  xs extends [infer head, ...infer tail]
    ? GreaterThan<Iterator<value>, Iterator<head>> extends true
      ? [...output, head, ...FilterGreaterThan<value, tail, output>]
      : [...output, ...FilterGreaterThan<value, tail, output>]
    : []


  type _Sort<
    TValues extends number[],
    TReverse extends boolean = false
  > =
      TValues extends [infer head, ...infer tail]
        ? TReverse extends true
          ? [...NumericSort<FilterLessThanOrEqual<head, tail>, TReverse>, head, ...NumericSort<FilterGreaterThan<head, tail>, TReverse>]
          : [...NumericSort<FilterGreaterThan<head, tail>, TReverse>, head, ...NumericSort<FilterLessThanOrEqual<head, tail>, TReverse>]
        : []


/**
 * **NumericSort**`<TValues, [TReverse]>`
 *
 * Sorts the values in a tuple numerically
 */
export type NumericSort<
  TValues extends any[],
  TReverse extends boolean = false
> = _Sort<AsNumericArray<TValues>,TReverse>

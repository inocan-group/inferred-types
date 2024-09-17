import { Container } from "../base-types"
import { And, As, Extends, IsStringLiteral, IsUndefined } from "../boolean-logic"
import { IsEqual } from "../boolean-logic/operators/IsEqual"
import { Get } from "../dictionary/Get"
import { DotPathFor } from "../string-literals"
import { AfterFirst } from "./AfterFirst"
import { AsNumericArray } from "./AsNumericArray"
import { FilterByProp } from "./FilterByProp"
import { First } from "./First"
import { GetEach } from "./GetEach"
import { Retain } from "./Retain"
import { RetainByProp } from "./RetainByProp"
import { Reverse } from "./Reverse"

type Iterator<
  N,
  iterator extends number[] = []
> = iterator['length'] extends N
    ? iterator
    : Iterator<N, [any, ...iterator]>

type Drop1<xs extends any[]> =
  xs extends [any, ...infer tail] ? tail : []

type LessThanOrEqual<
  a extends number[],
  b extends number[]
> =
  [a, b] extends [[], [any, ...any]]
    ? true
    : [a, b] extends [[any,...any], []]
    ? false
    : [a, b] extends [[], []]
    ? true
    : LessThanOrEqual<Drop1<a>, Drop1<b>>

type GreaterThan<
  a extends number[],
  b extends number[]
> =
  [a, b] extends [[], [any, ...any]]
    ? false
    : [a, b] extends [[any,...any], []]
    ? true
    : [a, b] extends [[], []]
    ? false
    : GreaterThan<Drop1<a>, Drop1<b>>


type FilterLessThanOrEqual<
  TVal,
  TValues extends number[],
  TOut extends number[] = []
> =
  TValues extends [infer head, ...infer tail extends number[]]
    ? LessThanOrEqual<Iterator<TVal>, Iterator<head>> extends true
      ? [...TOut, head, ...FilterLessThanOrEqual<TVal, tail, TOut>]
      : [...TOut, ...FilterLessThanOrEqual<TVal, tail, TOut>]
    : []

type FilterGreaterThan<
  TVal,
  TValues extends number[],
  TOut extends number[] = []
> =
  TValues extends [infer head, ...infer tail extends number[]]
    ? GreaterThan<Iterator<TVal>, Iterator<head>> extends true
      ? [...TOut, head, ...FilterGreaterThan<TVal, tail, TOut>]
      : [...TOut, ...FilterGreaterThan<TVal, tail, TOut>]
    : []


/**
 * Local Sort for values at root (aka, not offset)
 */
type _Sort<
    TValues extends readonly number[],
    TReverse extends boolean,
  > = TValues extends [infer head, ...infer tail extends number[]]
  ? TReverse extends true
    ? [
      ..._Sort<
        FilterLessThanOrEqual<head, tail>,
        TReverse
      >, head,
      ..._Sort<
        FilterGreaterThan<
          head,
          tail
        >,
        TReverse
      >]
    : [
        ..._Sort<
          FilterGreaterThan<head, tail>,
          TReverse
        >,
        head,
        ..._Sort<
          FilterLessThanOrEqual<head, tail>,
          TReverse
        >
      ]
  : [];


type _SortOffset<
  TContainers extends readonly Container[],
  TOffset extends string
> = TContainers extends [infer head extends Container, ...infer rest extends Container[]]
  ? [
      ..._SortOffset<
        As<RetainByProp<
          rest,
          Get<head, TOffset>,
          TOffset,
          "lessThanOrEqual"
        >, Container[]>,
        TOffset
      >,
      head,
      ..._SortOffset<
        As<RetainByProp<
          rest,
          Get<head, TOffset>,
          TOffset,
          "greaterThan"
        >, Container[]>,
        TOffset
      >
    ]
  : [];




export type NumericSupportOptions<
  TOrder extends "ASC" | "DESC" | undefined = "ASC" | "DESC"  | undefined,
  TOffset extends string | undefined = string | undefined
> = {
  /**
   * by default this is set to sort by _ascending_ order but this can be
   * reversed by changing order to `DESC`.
   */
  order?: TOrder;

  /**
   * by default, the sorting will expect the numeric value to exist
   * as the base type, however, if you are using some sort of "container"
   * object you may prefer to _offset_
   */
  offset?: TOffset;
}


/**
 * **NumericSort**`<TValues, [TOpt]>`
 *
 * Sorts the values in a tuple numerically.
 *
 * - _values_ can be a `number` or `${number}`
 *
 * Options:
 * - `order`: defaults to `ASC` but can be set to `DESC`
 * - `offset`:  if you have _containers_ as values, you can specify an offset to use to look for the numeric value
 */
export type NumericSort<
  TValues extends any[],
  TOpt extends NumericSupportOptions = NumericSupportOptions
> = IsStringLiteral<TOpt["offset"]> extends true
? [IsEqual<TOpt["order"], "ASC">] extends [true]
  ? _SortOffset<
      TValues,
      As<TOpt["offset"], string>
    >
  : Reverse<
      _SortOffset<
        TValues,
        As<TOpt["offset"], string>
      >
    >


: _Sort<
  AsNumericArray<TValues>,
  [IsEqual<TOpt["order"], "DESC">] extends [true]
    ? true
    : false
  >;

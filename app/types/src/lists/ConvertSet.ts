import { Narrowable , AfterFirst ,  First, Find } from "src/types/index";

export type ConversionTuple = [from: Narrowable, to: Narrowable];

type Convert<
  TValue,
  TConversions extends readonly ConversionTuple[]
> = Find<TConversions, "extends", TValue, 0> extends ConversionTuple
  ? Find<TConversions, "extends", TValue, 0>[1]
  : TValue;

type ConvertAcc<
  TSet extends readonly unknown[],
  TConversions extends readonly ConversionTuple[],
  TResults extends readonly unknown[] = []
> = [] extends TSet
  ? TResults
  : ConvertAcc<
      AfterFirst<TSet>,
      TConversions,
      [ ...TResults, Convert<First<TSet>, TConversions> ]
    >;

/**
 * **ConvertSet**`<TSet, TConversions>`
 *
 * Utility which works on a list `TSet` and converts matched values
 * to an alternative type.
 * ```ts
 * type List = ["abc", 123, null, "michael", undefined, "jackson"];
 * // ["abc", 123, "michael", "jackson"]
 * type Converted = ConvertSet<
 *    List, [ [null, never], [undefined, never] ]
 * >
 * ```
 */
export type ConvertSet<
  TSet extends readonly unknown[],
  TConversions extends ConversionTuple | readonly ConversionTuple[]
> = TConversions extends readonly ConversionTuple[]
  ? ConvertAcc<TSet, TConversions>
  : TConversions extends ConversionTuple
    ? ConvertAcc<TSet, readonly [TConversions]>
    : never;

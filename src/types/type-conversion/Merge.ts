import { 
  IsUndefined , 
  DoesExtend, 
  If,
  And , 
  IsOptionalScalar , 
  Narrowable, 
  AfterFirst , 
  First , 
  Scalar, 
  MergeObjects,
  Dictionary
} from "src/types/index";

// 1. Keep all unique keys in `TValue`
// 2. Strip all KV's on `TValue` which are _undefined_
// 3. Add all unique props from `TDefaultVal`

export type MergeScalars<
  TDefault extends Narrowable,
  TOverride extends Narrowable,
> = IsOptionalScalar<TDefault> extends true
? IsOptionalScalar<TOverride> extends true
  ? IsUndefined<TOverride> extends true
    ? TDefault
    : Exclude<TOverride, undefined>
  : never
: never;



type MergeTuplesAcc<
  TDefault extends readonly unknown[],
  TOverride extends readonly unknown[],
  TKey extends string | false = false,
  TResults extends readonly unknown[] = []
> = TOverride extends [infer Override, ...infer Rest extends unknown[]]
  ? If<
    IsUndefined<Override>,
    MergeTuplesAcc<AfterFirst<TDefault>, Rest, TKey, [...TResults, First<TDefault>]>,
    MergeTuplesAcc<AfterFirst<TDefault>, Rest, TKey, [...TResults, Override]>
  >
  : readonly [...TResults, ...TDefault];

/**
 * **MergeTuples**
 * 
 * Merges two tuple arrays by position in the tuple:
 * 
 * - if `TOverride` is longer than `TDefault` then no defaults will be provided
 * - if `TDefault` is longer than `TOverride` then `TDefault` will be extended
 */
export type MergeTuples<
  TDefault extends readonly Narrowable[],
  TOverride extends readonly Narrowable[],
  TKey extends string | false = false // TODO: not currently being used
> = MergeTuplesAcc<[...TDefault], [...TOverride], TKey>;



// /**
//  * **Merge**`<TDefault,TOverride>`
//  *
//  * A type utility that will merge any two values together. The merge strategy
//  * is broken up by scalar, tuple, and object types each of which leverages the
//  * `MergeScalars`, `MergeTuples`, and `MergeObjects` utilities.
//  * 
//  * You may want to consider using the specific merge utility if you have that option
//  * but there are cases where another level of indirection is desirable.
//  */
export type Merge<
  TDefault, 
  TOverride
> = If<
  And<[DoesExtend<TDefault, Dictionary>, DoesExtend<TOverride, Dictionary>]>,
  MergeObjects<TDefault & Dictionary,TOverride & Dictionary>,
  If<
    And<[ DoesExtend<TDefault, Scalar>, DoesExtend<TOverride, Scalar> ]>,
    MergeScalars<TDefault & Scalar, TOverride & Scalar>,
    If<
      And<[ 
        DoesExtend<TDefault, readonly Narrowable[]>, 
        DoesExtend<TOverride, readonly Narrowable[]> 
      ]>,
      MergeTuples<TDefault & readonly Narrowable[], TOverride & readonly Narrowable[]>,
      never
    >
  >
>;

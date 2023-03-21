import { 
  IfUndefined , 
  DoesExtend, 
  IfAnd , 
  IsOptionalScalar , 
  Narrowable , 
  ExpandRecursively , AfterFirst , First , AnyObject, Scalar } from "src/types";

// 1. Keep all unique keys in `TValue`
// 2. Strip all KV's on `TValue` which are _undefined_
// 3. Add all unique props from `TDefaultVal`

export type MergeScalars<
  TDefault extends Narrowable,
  TOverride extends Narrowable,
> = IfAnd<
  [IsOptionalScalar<TDefault>, IsOptionalScalar<TOverride>],
  IfUndefined<
    TOverride,
    TDefault,
    Exclude<TOverride, undefined>
  >,
  never
>;

type MergeTuplesAcc<
  TDefault extends readonly unknown[],
  TOverride extends readonly unknown[],
  TKey extends string | false = false,
  TResults extends readonly unknown[] = []
> = TOverride extends [infer Override, ...infer Rest extends unknown[]]
  ? IfUndefined<
    Override,
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

/**
 * **MergeObjects**`<TDefault,TOverride>`
 * 
 * A type utility that deeply merges two object types.
 * In cases where property values overlap, the values of `TOverride` will 
 * override `TDefault`.
 */
export type MergeObjects<
  TDefault extends AnyObject,
  TOverride extends AnyObject,
> = {
  [P in keyof TOverride | keyof TDefault]: P extends keyof TOverride 
    ? TOverride[P] extends AnyObject
      ? P extends keyof TDefault
        ? TDefault[P] extends AnyObject
          ? ExpandRecursively<MergeObjects<TOverride[P], TDefault[P]>>
          : TOverride[P]
      : TOverride[P]
    : TOverride[P]
    : P extends keyof TDefault 
      ? TDefault[P] 
      : never;
};


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
> = IfAnd<
  [DoesExtend<TDefault, AnyObject>, DoesExtend<TOverride, AnyObject>],
  MergeObjects<TDefault & AnyObject,TOverride & AnyObject>,
  IfAnd<
    [ DoesExtend<TDefault, Scalar>, DoesExtend<TOverride, Scalar> ],
    MergeScalars<TDefault & Scalar, TOverride & Scalar>,
    IfAnd<
      [ DoesExtend<TDefault, readonly Narrowable[]>, DoesExtend<TDefault, readonly Narrowable[]> ],
      MergeTuples<TDefault & readonly Narrowable[], TOverride & readonly Narrowable[]>,
      never
    >
  >
>;

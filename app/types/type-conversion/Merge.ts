import { 
  IsUndefined , 
  DoesExtend, 
  If,
  And , 
  Narrowable, 
  AfterFirst , 
  First , 
  Scalar, 
  MergeObjects,
  Dictionary,
  AsDictionary,
  AreSameType,
  Throw,
  Or,
  IsNothing,
  Nothing
} from "src/types/index";

// 1. Keep all unique keys in `TValue`
// 2. Strip all KV's on `TValue` which are _undefined_
// 3. Add all unique props from `TDefaultVal`


/**
 * **MergeScalars**`<TDefault, TOverride, [TEmpty]>`
 * 
 * Provides a `Scalar` value by evaluating whether `TDefault`
 * and `TOverride` extends `TEmpty` (which is `null` | `undefined`
 * by default).
 * 
 * Note: if both `TDefault` and `TOverride` are _undefined_ then the
 * exiting type will be _undefined_ (which isn't strictly a `Scalar` 
 * value).
 */
export type MergeScalars<
  TDefault extends Scalar | undefined,
  TOverride extends Scalar | undefined,
  TEmpty extends Scalar | undefined = null | undefined
> = TDefault extends TEmpty
? TOverride
: TOverride extends TEmpty
  ? TDefault : TOverride;



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


type Process<
TDefault, 
TOverride
> = And<[
  DoesExtend<TDefault, Dictionary|Nothing>, DoesExtend<TOverride, Dictionary|Nothing>
]> extends true
? MergeObjects<AsDictionary<TDefault>,AsDictionary<TOverride> >
: And<[ 
    DoesExtend<TDefault, Scalar|undefined>, DoesExtend<TOverride, Scalar|undefined> 
  ]> extends true
  ? MergeScalars<TDefault & Scalar, TOverride & Scalar>
  :
    And<[ 
      DoesExtend<TDefault, readonly Narrowable[]>, 
      DoesExtend<TOverride, readonly Narrowable[]> 
    ]> extends true
    ? MergeTuples<TDefault & readonly Narrowable[], TOverride & readonly Narrowable[]>
    : never;


/**
 * **Merge**`<TDefault,TOverride>`
 *
 * A type utility that will merge any two like values together. 
 * 
 * **Related:** `MergeObjects`, `MergeScalars`, `MergeTuples`
 */
export type Merge<
  TDefault, 
  TOverride,
> = AreSameType<TDefault,TOverride> extends true
? Process<TDefault,TOverride>
: Or<[
    IsNothing<TDefault>, IsNothing<TOverride>
  ]> extends true
    ? And<[IsNothing<TDefault>, IsNothing<TOverride>]> extends true 
      ? Throw<
          "invalid-merge", 
          `Merge<TDef,TOver> received two empty values; at least one needs to have a value!`,
          "Merge",
          { library: "inferred-types"; TDef: TDefault; TOver: TOverride }
        >
      : Process<TDefault, TOverride>
    : Throw<
      "invalid-merge",
      `the Merge<TDef,TOver> utility can merge various types but both types must be of the same base type and they were not!`,
      "Merge",
      { library: "inferred-types"; TDef: TDefault; TOver: TOverride}
    >;


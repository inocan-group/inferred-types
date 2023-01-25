import { AnyObject, IfObject, IsOptionalScalar } from "src/types/boolean-logic";
import { Retain, Keys } from "src/types";
import { IfUndefined } from "../boolean-logic/IsUndefined";
import { Narrowable } from "../Narrowable";
import { IfAnd } from "../boolean-logic/And";
import { AfterFirst } from "../lists/AfterFirst";
import { First } from "../lists/First";
import { UnionToTuple } from "./UnionToTuple";
import { KvPair, KvToObject } from ".";
import { ExpandRecursively } from "../ExpandRecursively";
import { WithoutKeys } from "../dictionary/WithKeys";

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
  TDefault extends readonly Narrowable[],
  TOverride extends readonly Narrowable[],
  TKey extends string | false = false,
  TResults extends readonly any[] = []
> = TOverride extends [infer Override, ...infer Rest]
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
  TKey extends string | false = false
> = MergeTuplesAcc<[...TDefault], [...TOverride], TKey>;

type MergeObjectsAcc<
  TDefault extends Record<string, any>,
  TOverride extends Record<string, any>,
  TKeys extends readonly (keyof TOverride)[],
  TResults extends {} = {},
> = [] extends TKeys
  ? TResults
  : First<TKeys> extends infer Key
  ? Key extends keyof TOverride
  ? IfUndefined<
    TOverride[Key],
    // override value is undefined
    Key extends keyof TDefault
    ? MergeObjectsAcc<
      TDefault, TOverride,
      AfterFirst<TKeys>,
      ExpandRecursively<TResults & Record<Key, TDefault[Key]>>
    >
    : MergeObjectsAcc<
      TDefault, TOverride,
      AfterFirst<TKeys>,
      ExpandRecursively<TResults & Record<Key, undefined>>
    >,
    // override value IS defined
    IfObject<
      TOverride[Key],
      MergeObjectsAcc<
        TDefault, TOverride,
        AfterFirst<TKeys>,
        Key extends keyof TDefault
        ? IfObject<
          TDefault[Key],
          ExpandRecursively<
            TResults & Record<Key, MergeObjects<TDefault[Key], TDefault[Key]>>
          >,
          ExpandRecursively<TResults & Record<Key, TOverride[Key]>>
        >
        : ExpandRecursively<TResults & Record<Key, TOverride[Key]>>
      >,
      // value is NOT an object but also not undefined
      MergeObjectsAcc<
        TDefault, TOverride,
        AfterFirst<TKeys>,
        ExpandRecursively<TResults & Record<Key, TOverride[Key]>>
      >
    >
  >
  : never
  : never;

type RemainingDefault<
  TDefault extends AnyObject,
  TOverride extends AnyObject
> = WithoutKeys<
  TDefault,
  Retain<Keys<TOverride>, string>
>;

/**
 * **MergeObjects**`<TDefault, TOverride>`
 * 
 * A type utility that deeply merges the types of two object types.
 */
export type MergeObjects<
  TDefault extends AnyObject,
  TOverride extends AnyObject,
> = ExpandRecursively<
  MergeObjectsAcc<
    TDefault,
    TOverride,
    UnionToTuple<keyof TOverride> extends readonly (keyof TOverride)[]
    ? UnionToTuple<keyof TOverride>
    : never
  > & RemainingDefault<TDefault, TOverride>
>;

/**
 * **MergeKvPairs**`<TDefault,TOverride>`
 * 
 * A specialization of the `MergeTuples` utility which looks to merge
 * two arrays of `KvPair<string, any>` values. This will use the same
 * base logic as the general form but 
 */
export type MergeKvPairs<
  TDefault extends readonly KvPair<string, any>[],
  TOverride extends readonly KvPair<string, any>[],
> = MergeObjects<KvToObject<TDefault>, KvToObject<TOverride>>;
// /**
//  * **Merge**`<TDefault,TOverride>`
//  *
//  * A type utility that will merge any two values together. The merge strategy
//  * is broken up by scalar, tuple, and object types each of which leverages the
//  * `MergeScalars`, `MergeTuples`, and `MergeObjects` utilities.
//  * 
//  * You may want to consider using the specific merge utility if you have that option
//  * but there are cases where another level of indirection is needed.
//  */
// export type Merge<
//   TDefault, 
//   TOverride
// > = IfAnd<
//   [IsOptionalScalar<TDefault>, IsScalar<TOverride>],
//   IfAnd<
//     [IsObject<TDefault>, IsObject<TOverride>],
//     MergeObjects<TDefault & AnyObject, TOverride>,
//     IfAnd<
//       [IsReadonlyArray<TDefault>,IsReadonlyArray<TOverride>],
//       MergeTuples<TDefault & readonly any[],TOverride & readonly any[]>,
//       never
//     >
//   >,
//   never
// >;

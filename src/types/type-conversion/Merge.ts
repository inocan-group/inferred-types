import { AnyObject, IfNotNever, IfObject, IsObject, IsOptionalScalar, IsReadonlyArray, IsScalar } from "src/types/boolean-logic";
import { SimplifyObject } from "../SimplifyObject";
import { IfUndefined } from "../boolean-logic/IsUndefined";
import { Narrowable } from "../Narrowable";
import { IfAnd } from "../boolean-logic/And";
import { AfterFirst } from "../lists/AfterFirst";
import { First } from "../lists/First";
import { SetRemoval } from "../lists";
import { Keys } from "../Keys";
import { UnionToTuple } from "./UnionToTuple";
import { KvPair, KvToObject } from ".";
import { ObjectToKv } from "./ObjectToKv";
import { Retain } from "../Retain";

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
  TOverride extends readonly KvPair<any, any>[],
  TResults extends readonly KvPair<string, any>[] = [],
 > = [] extends TOverride
  ? KvToObject<TResults>
  : First<TOverride> extends KvPair<any, any>
    ? First<TOverride> extends KvPair<infer Key, infer Value>
      ? // override value is an object
        Value extends Record<string, any> 
        ? TDefault[Key] extends Record<string, any> // default also an object
          ? MergeObjectsAcc< // both values are objects
              TDefault,
              AfterFirst<TOverride>, // move to next item
              any
            >
          : never
            
        : // value is NOT an object
          undefined extends First<TOverride>["value"]
            ? MergeObjectsAcc<
                TDefault,
                AfterFirst<TOverride>,
                any
                // [
                //     ...TResults,
                //     KvPair<Key, TDefault[Key]>
                // ]
              >
            : MergeObjectsAcc<
                TDefault,
                AfterFirst<TOverride>,
                [
                  ...TResults, 
                  { key: Key; value: Value }
                ]
              >
          : "not-inferrable" // all overrides should be inferrable
        : "shit"; // all overrides should extend KvPair
    
  

          

/**
 * **MergeObjects**
 * 
 * A type utility that merges the types of two object types. Merging rules are:
 * 
 * - 
 */
export type MergeObjects<
  TDefault extends Record<string, any>,
  TOverride extends Record<string, any>,
> = SimplifyObject<
  MergeObjectsAcc<
    TDefault,
    ObjectToKv<TOverride>
  > & 
  Exclude<
    TDefault,
    SetRemoval<
      // all default keys
      UnionToTuple<keyof TDefault>, 
      // which aren't defined in the override
      UnionToTuple<keyof TOverride>
    >
  >
>;

/**
 * **Merge**`<TDefault,TOverride>`
 *
 * A type utility that will merge any two values together. The merge strategy
 * is broken up by scalar, tuple, and object types each of which leverages the
 * `MergeScalars`, `MergeTuples`, and `MergeObjects` utilities.
 * 
 * You may want to consider using the specific merge utility if you have that option
 * but there are cases where another level of indirection is needed.
 */
export type Merge<TDefault, TOverride> = IfAnd<
  [IsOptionalScalar<TDefault>, IsScalar<TOverride>],
  IfAnd<
    [IsObject<TDefault>, IsObject<TOverride>],
    MergeObjects<TDefault & AnyObject,TOverride>,
    IfAnd<
      [IsReadonlyArray<TDefault>,IsReadonlyArray<TOverride>],
      MergeTuples<TDefault & readonly any[],TOverride & readonly any[]>,
      never
    >
  >,
  never
>;

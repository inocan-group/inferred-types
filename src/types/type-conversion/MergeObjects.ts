import {
  AfterFirst,
  CombinedKeys,
  ExpandRecursively,
  First,
  IsDefined,
  Dictionary,
  ObjectKey,
  Nothing,
  IsNothing,
  EmptyObject,
  If,
  As,
  ExpandDictionary
} from "inferred-types/dist/types/index";

type Process<
  TKeys extends readonly unknown[],
  TDef extends Dictionary,
  TOverride extends Dictionary,
  TResult extends Dictionary = EmptyObject
> = [] extends TKeys
  ? ExpandRecursively<TResult>
  : Process<
    AfterFirst<TKeys>,
    TDef,
    TOverride,
    First<TKeys> extends keyof TOverride
    ? IsDefined<TOverride[First<TKeys>]> extends true
    ? TResult & Record<First<TKeys>, TOverride[First<TKeys>]>
    : First<TKeys> extends keyof TDef
    ? TResult & Record<First<TKeys>, TDef[First<TKeys>]>
    : TResult & Record<First<TKeys>, undefined>
    : First<TKeys> extends keyof TDef
    ? TResult & Record<First<TKeys>, TDef[First<TKeys>]>
    : First<TKeys> extends ObjectKey
    ? TResult & Record<First<TKeys>, undefined>
    : never
  >;

type Merged<
  TKeys extends readonly string[],
  TBase extends Record<string, unknown>,
  TErr extends Record<string, unknown>,
  TResult extends Record<string, unknown> = EmptyObject
> = [] extends TKeys
? ExpandDictionary<TResult>
: Merged<
    AfterFirst<TKeys>,
    TBase,
    TErr,
    First<TKeys> extends keyof TErr
      ? TResult & Record<First<TKeys>, TErr[First<TKeys>]>
      : First<TKeys> extends keyof TBase
      ? TResult & Record<First<TKeys>, TBase[First<TKeys>]>
      : never
  >;

/**
 * **MergeObjects**`<TDefault,TOverride>`
 *
 * A type utility that _shallowly merges_ two object types.
 */
export type MergeObjects<
  TDef extends Dictionary,
  TOverride extends Dictionary,
> = Merged<
      As<CombinedKeys<TDef,TOverride>, readonly string[]>,
      TDef,
      TOverride
    >


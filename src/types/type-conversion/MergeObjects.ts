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
  As
} from "src/types/index";

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

/**
 * **MergeObjects**`<TDefault,TOverride>`
 * 
 * A type utility that _shallowly merges_ two object types.
 */
export type MergeObjects<
  TDef extends Dictionary | Nothing,
  TOverride extends Dictionary | Nothing,
> = Process<
  CombinedKeys<
    As<If<IsNothing<TDef>, EmptyObject, TDef>, Dictionary>,
    As<If<IsNothing<TOverride>, EmptyObject, TOverride>, Dictionary>
  >,
  As<If<IsNothing<TDef>, EmptyObject, TDef>, Dictionary>,
  As<If<IsNothing<TOverride>, EmptyObject, TOverride>, Dictionary>
>;


import { AfterFirst, AsRecord, CombinedKeys, ExpandRecursively, First, IsDefined, Dictionary, ObjectKey  } from "src/types/index";

type Process<
  TKeys extends readonly unknown[],
  TDef extends Dictionary,
  TOverride extends Dictionary,
  // eslint-disable-next-line @typescript-eslint/ban-types
  TResult extends Record<string|symbol, unknown> = {}
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
  TDef extends Dictionary,
  TOverride extends Dictionary,
> = Process<
  CombinedKeys<TDef,TOverride>,
  AsRecord<TDef>,
  TOverride
>;

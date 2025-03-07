import type {
    AfterFirst,
    AnyObject,
    As,
    CombinedKeys,
    Dictionary,
    EmptyObject,
    ExpandDictionary,
    First,
} from "inferred-types/types";

type Merged<
    TKeys extends readonly string[],
    TBase extends Record<string, unknown>,
    TErr extends Record<string, unknown>,
    TResult extends Record<string, unknown> = EmptyObject,
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
> = TDef extends Dictionary

    ? Merged<
        As<CombinedKeys<TDef, TOverride>, readonly string[]>,
        TDef,
        TOverride
    >

    : never;

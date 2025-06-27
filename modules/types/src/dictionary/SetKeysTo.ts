import type {
    AfterFirst,
    AnyObject,
    ExpandDictionary,
    First,
} from "inferred-types/types";

/**
 * **SetKeysTo**`<TObj, TKeys, TValue>`
 *
 * Mutates the type of `TObj` to have all keys specified in `TKeys` to by
 * typed to the value of `TValue`.
 */
export type SetKeysTo<
    TObj extends AnyObject,
    TKeys extends readonly string[],
    TValue,
> = [] extends TKeys
    ? ExpandDictionary<TObj>
    : SetKeysTo<
    TObj & Record<First<TKeys>, TValue>,
        AfterFirst<TKeys>,
        TValue
    >;

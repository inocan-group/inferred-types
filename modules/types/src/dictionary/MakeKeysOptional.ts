import type {
    Dictionary,
    Expand,
    IsWideContainer,
    ObjectKey,
    WithKeys,
    WithoutKeys,
} from "inferred-types/types";

type ProcessTupleKeys<
    TObj extends Dictionary,
    TKeys extends readonly ObjectKey[],
> = Expand<
    WithoutKeys<TObj, TKeys> & {
        [K in keyof WithKeys<TObj, TKeys>]?: K extends keyof TObj
            ? TObj[K]
            : never
    }
>;

/**
 * **MakeKeysOptional**`<TObj, TKeys>`
 *
 * Makes a set of keys on a known object `TObj` become
 * _optional_ parameters while leaving the other properties
 * "as is".
 *
 * **Related:** `MakeKeysRequired`
 */
export type MakeKeysOptional<
    TObj extends Dictionary,
    TKeys extends readonly ObjectKey[],
> = IsWideContainer<TObj> extends true
    ? TObj
    : TObj extends Dictionary
        ? ProcessTupleKeys<TObj, TKeys>
        : never;

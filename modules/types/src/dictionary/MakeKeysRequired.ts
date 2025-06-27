import type { Dictionary, ExpandDictionary, ObjectKey, WithKeys, WithoutKeys } from "inferred-types/types";

/**
 * **MakeKeysRequired**`<TObj, TKeys>`
 *
 * Makes a set of keys on a known object `TObj` become
 * _optional_ parameters while leaving the other properties
 * "as is".
 *
 * **Related:** `MakeKeysOptional`
 */
export type MakeKeysRequired<
    TObj extends Dictionary,
    TKeys extends (string | symbol) | readonly ObjectKey[],
> = ExpandDictionary<
    WithoutKeys<TObj, TKeys> &
    {
        [K in keyof WithKeys<TObj, TKeys>]: K extends keyof TObj
            ? TObj[K]
            : never
    }
>;

import type {
    As,
    Dictionary,
    IsEqual,
    ObjectKey,
    RemoveIndexKeys,
    WithKeys
} from "inferred-types/types";

/* eslint-disable ts/no-unused-vars, unused-imports/no-unused-vars */

/**
 * **OnlyFixedKeys**`<T>`
 *
 * Removes all index index keys to leave a dictionary with only the
 * _fixed_ keys defined in `T`.
 *
 * **Related:** `GetFixedKeys`, `OnlyIndexKeys`, `GetIndexKeys`
 */
export type OnlyFixedKeys<
    T,
> = T extends Dictionary
    ? WithKeys<T, As<GetFixedKeys<T>, PropertyKey>>
    : never;

/**
 * **GetFixedKeys**`<T>`
 *
 * Returns a union type for all _fixed_ keys found in `T` (aka, not indexed keys).
 *
 * **Related:** `GetIndexKeys`, `OnlyFixedKeys`, `RemoveIndexKeys`
 */
export type GetFixedKeys<T> = IsEqual<T, Dictionary> extends true
    ? ObjectKey[]
    : T extends Dictionary
        ? keyof RemoveIndexKeys<T>
        : never;


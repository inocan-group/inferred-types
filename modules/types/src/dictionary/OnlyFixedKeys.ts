import type {
    As,
    Dictionary,
    GetFixedKeys,
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

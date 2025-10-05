import type {
    Dictionary,
    IsEqual,
    ObjectKey,
    RemoveIndexKeys,
} from "inferred-types/types";

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

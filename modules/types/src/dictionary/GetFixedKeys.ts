import type {
    As,
    Dictionary,
    IsTemplateLiteral,
    IsWideObject,
    IsWideType,
    ObjectKey,
    ObjectKeys,
    RemoveNever,
    WithKeys
} from "inferred-types/types";

/* eslint-disable ts/no-unused-vars, unused-imports/no-unused-vars */

export type DictionaryWithFixedKeys<
    T,
> = T extends Dictionary
    ? WithKeys<T, As<GetFixedKeys<T>, PropertyKey>>
    : never;

/**
 * **GetFixedKeys**`<T>`
 *
 * Returns a union type for all _fixed_ keys found in `T` (aka, not indexed keys).
 *
 * **Related:** `GetIndexKeys`, `DictionaryWithFixedKeys`
 */
export type GetFixedKeys<T> = IsWideObject<T> extends true
    ? Dictionary
    : T extends Dictionary
        ? Required<ObjectKeys<T>> extends infer Keys extends readonly ObjectKey[]
            ? RemoveNever<{
                [K in keyof Keys]: IsTemplateLiteral<Keys[K]> extends true
                    ? never
                    : IsWideType<Keys[K]> extends true
                        ? never
                        : Keys[K]
            }> extends infer Keys extends readonly ObjectKey[]
                ? Keys[number]
                : never
            : never
        : never;

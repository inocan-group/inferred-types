import { As, Dictionary, EmptyObject, ExpandRecursively, IsTemplateLiteral, IsWideObject, IsWideType, ObjectKey, ObjectKeys, RemoveNever, WithKeys } from "inferred-types/types";

type Obj<T> = {
    [K in keyof T as string extends K
        ? never
        : number extends K
            ? never
            : symbol extends K
                ? never
                : K]: T[K]
} & {};


type GetFixed<
    T extends Dictionary,
    K extends readonly ObjectKey[],
    R extends Dictionary
> = K  extends [ infer Head extends ObjectKey, ...infer Rest extends readonly ObjectKey[] ]
    ? IsTemplateLiteral<Head> extends true
        ? GetFixed<T, Rest, R>
    : string extends Head
        ? GetFixed<T, Rest, R>
    : GetFixed<T, Rest, R & Record<Head, T[Head]>>
: ExpandRecursively<R>;


export type DictionaryWithFixedKeys<
    T,
> = T extends Dictionary
    ? WithKeys<T, As<GetFixedKeys<T>, PropertyKey>>
    : never

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

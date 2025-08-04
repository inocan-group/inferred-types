import {
    AfterFirst,
    As,
    Contains,
    Err,
    First,
    IsAny,
    IsEqual,
    IsLiteralString,
    IsNever,
    IsTemplateLiteral,
    NotFilter,
    ObjectKey,
    OptionalKeysTuple,
    UnionToTuple
} from "inferred-types/types";


type Shaped<
    TKeys extends readonly PropertyKey[],
    TOpt extends readonly PropertyKey[],
    L extends readonly PropertyKey[] = [], // literal
    O extends readonly PropertyKey[] = [], // optional
    V extends readonly PropertyKey[] = [], // variadic
> = [] extends TKeys
? [
    ...L,
    ...(Partial<O>),
    ...(Partial<V>)
]

: IsTemplateLiteral<First<TKeys>> extends true
    ? Shaped<AfterFirst<TKeys>, TOpt, L, O, [...V, First<TKeys>]>
    : Contains<TOpt, First<TKeys>> extends true
        ? Shaped<AfterFirst<TKeys>, TOpt, L, [...O, First<TKeys>], V>
        : Shaped<AfterFirst<TKeys>, TOpt, [...L, First<TKeys>], O, V>;

/**
 * **ObjectKeys**`<TObj>`
 *
 * Provides the keys of a given object in a tuple form.
 *
 * **Related:** `Keys`, `OptionalKeys`, `RequiredKeys`, `NumericKeys`
 */
export type ObjectKeys<
    TObj extends object
> = [IsAny<TObj>] extends [TObj]
? Err<
    `invalid-type/object-keys`,
    `Call to ObjectKeys<T> where T was 'any'!`
>
: Required<TObj> extends Record<infer K, any>
    ? IsEqual<K, string | symbol> extends true
        ? ObjectKey[]
    : IsNever<K> extends true
        ? PropertyKey[]
    : IsLiteralString<K, "allow-union"> extends true
        ? Shaped<
            As< NotFilter<UnionToTuple<K>, "equals", [boolean]>, readonly PropertyKey[]>,
            OptionalKeysTuple<TObj>
        >
        : K[]
    : [TObj];




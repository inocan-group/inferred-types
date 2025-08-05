import type {
    AfterFirst,
    As,
    Contains,
    Dictionary,
    Err,
    First,
    IsAny,
    IsEqual,
    IsLiteralString,
    IsLiteralUnion,
    IsNever,
    IsTemplateLiteral,
    IsUnion,
    IsWideUnion,
    ObjectKey,
    OptionalKeysTuple,
    Scalar,
    UnionToTuple
} from "inferred-types/types";

type Shaped<
    TKeys extends readonly PropertyKey[],
    TOpt extends readonly PropertyKey[],
    L extends readonly PropertyKey[] = [],
    O extends readonly PropertyKey[] = [],
    V extends readonly PropertyKey[] = [], // variadic
> = [] extends TKeys
    ? [...L, ...Partial<O>, ...Partial<V>]
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
    TObj
> = [IsAny<TObj>] extends [true]
    ? Err<
        `invalid-type/object-keys`,
        `Call to ObjectKeys<T> where T was 'any'!`
    >
    : IsNever<TObj> extends true
        ? Err<
            `invalid-type/object-keys`,
            `Call to ObjectKeys<T> where T was 'never'!`
        >

        : TObj extends object
            ? TObj extends Map<infer K, any>

                ? IsUnion<K> extends true
                    ? IsLiteralUnion<K> extends true
                        ? Required<Shaped<
                            As<UnionToTuple<K>, readonly PropertyKey[]>,
                            OptionalKeysTuple<TObj>
                        >>
                        : IsWideUnion<K> extends true
                            ? UnionToTuple<K>[]
                            : "mixed"
                    : K[]
                : TObj extends Set<any>
                    ? Err<`invalid-type/object-keys`, `The type passed into ObjectKeys<T> was a Set. Set's do not have keys`>
                    : TObj extends WeakMap<infer K, any>
                        ? IsUnion<K> extends true
                            ? K
                            : K extends Scalar | object | readonly unknown[]
                                ? K[]
                                : unknown
                        : Required<TObj> extends Record<infer K, any>
                            ? IsNever<K> extends true
                                ? TObj extends Dictionary
                                    ? []
                                    : PropertyKey[]
                                : IsEqual<K, string | symbol> extends true
                                    ? ObjectKey[]
                                    : IsNever<K> extends true
                                        ? PropertyKey[]
                                        : IsLiteralString<K, "allow-union"> extends true
                                            ? Shaped<
                                                As<UnionToTuple<K>, readonly PropertyKey[]>,
                                                OptionalKeysTuple<TObj>
                                            >
                                            : K[]
                            : never
            : Err<`invalid-type/object-keys`, `The type passed into ObjectKeys<T> was not an object!`, { value: TObj }>;

import type {
    AfterFirst,
    As,
    Contains,
    Dictionary,
    Err,
    First,
    GetFixedKeys,
    GetIndexKeys,
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
    RemoveIndexKeys,
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
        ? First<TKeys> & string extends infer Pattern extends string
            ? Shaped<
                AfterFirst<TKeys>,
                TOpt,
                L,
                O,
                [...V, ...Pattern[]]
            >
            : never
        : Contains<TOpt, First<TKeys>> extends true
            ? Shaped<AfterFirst<TKeys>, TOpt, L, [...O, First<TKeys>], V>
            : Shaped<AfterFirst<TKeys>, TOpt, [...L, First<TKeys>], O, V>;

type HandleDict<
    TObj extends Dictionary
> = Required<TObj> extends Record<infer K, any>
    ? IsNever<K> extends true
        ? TObj extends Dictionary
            ? []
            : PropertyKey[]
        : IsEqual<K, string | symbol> extends true
            ? ObjectKey[]
            : IsEqual<K, string> extends true
                ? string[]
                : IsEqual<K, symbol> extends true
                    ? symbol[]
                    : IsEqual<K, number> extends true
                        ? number[]
                        : IsNever<K> extends true
                            ? PropertyKey[]
                            : IsNever<GetIndexKeys<TObj>> extends true
                                ? IsLiteralString<K> extends true
                                    ? Shaped<
                                        As<UnionToTuple<K>, readonly PropertyKey[]>,
                                        OptionalKeysTuple<TObj>
                                    >
                                    : IsUnion<K> extends true
                                        ? Shaped<
                                            As<UnionToTuple<K>, readonly PropertyKey[]>,
                                            OptionalKeysTuple<TObj>
                                        >
                                    // wide type
                                        : K[]
                                : [
                                    ...UnionToTuple<GetFixedKeys<TObj>>,
                                    ...(GetIndexKeys<TObj>)[]
                                ]
    : never;

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
        // Map
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
            // Set
                : TObj extends Set<any>
                    ? Err<
                        `invalid-type/object-keys`,
                        `The type passed into ObjectKeys<T> was a Set. Set's do not have keys`
                    >
                // WeakMap
                    : TObj extends WeakMap<infer K, any>
                        ? IsUnion<K> extends true
                            ? K
                            : K extends Scalar | object | readonly unknown[]
                                ? K[]
                                : unknown
                    // Dictionary
                        : Required<TObj> extends Record<infer K, any>
                            ? IsNever<K> extends true
                                ? TObj extends Dictionary
                                    ? []
                                    : PropertyKey[]
                                : IsEqual<K, string | symbol> extends true
                                    ? ObjectKey[]
                                    : IsEqual<K, string | number> extends true
                                        ? RemoveIndexKeys<Required<TObj>> extends Record<infer _K, any>
                                            ? [
                                                ...(As<ObjectKeys<RemoveIndexKeys<Required<TObj>>>, readonly PropertyKey[]>),
                                                ...string[]
                                            ]
                                            : PropertyKey[]
                                        : IsNever<K> extends true
                                            ? PropertyKey[]
                                            : TObj extends Dictionary
                                                ? HandleDict<TObj>
                                            // wide type
                                                : K[]
                        // object options exhausted
                            : ObjectKey[]
            : Err<
                `invalid-type/object-keys`,
                `The type passed into ObjectKeys<T> was not an object!`,
                { value: TObj }
            >;

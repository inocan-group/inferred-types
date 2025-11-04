import type {
    As,
    Dictionary,
    EmptyObject,
    ExpandDictionary,
    HasOptionalElements,
    IsBoolean,
    IsEqual,
    IsTrue,
    IsWideArray,
    MakeKeysOptional,
    ObjectKeys,
    OptionalKeys,
    OptionalKeysTuple,
    TakeOptionalElements,
    TakeRequiredElements,
    WithKeys,
    WithoutKeys,
} from "inferred-types/types";

type Tuple<
    T extends readonly unknown[],
    R extends readonly unknown[] = []
> = T extends [
    infer Head,
    ...infer Rest
]
    ? Tuple<Rest, IsBoolean<Head> extends true ? R : [...R, Head]>
    : R;

type ProcessDict<
    T extends Dictionary,
    K extends readonly (PropertyKey & keyof T)[] = As<ObjectKeys<T>, readonly (PropertyKey & keyof T)[]>,
    R extends Dictionary = EmptyObject
> = K extends [
    infer Head extends PropertyKey & keyof T,
    ...infer Rest extends readonly (PropertyKey & keyof T)[]
]
    ? ProcessDict<
        T,
        Rest,
        IsBoolean<T[Head]> extends true
            ? R
            : R & Record<Head, T[Head]>
    >
    : ExpandDictionary<R>;

/**
 * **RemoveBoolean**`<T, O>`
 *
 * Removes boolean _values_ from an array or a dictionary object.
 *
 * - the `O` generic determines how we should treat _optional_ values:
 *     - when **true** (_the default_) any boolean value including an
 *       optional one is removed
 *     - when **false** any optional properties are just
 *       left "as is" but the required ones are removed
 * - any value of `boolean`, `true`, or `false` will be removed
 * - for dictionaries when the _value_ is a boolean value the key/value
 *   pair is removed
 * - for arrays this just acts as a filter which removes all boolean types
 */
export type RemoveBoolean<
    T extends readonly unknown[] | Dictionary,
    O extends boolean = true
>
    = T extends readonly unknown[]
        ? IsWideArray<T> extends true
            ? IsEqual<T, boolean[]> extends true
                ? []
                : T
            : HasOptionalElements<T> extends true
                ? TakeOptionalElements<T> extends infer Opt extends readonly unknown[]
                    ? TakeRequiredElements<T> extends infer Req extends readonly unknown[]
                        ? [IsTrue<O>] extends [true]
                            ? [
                                ...Tuple<Req>,
                                ...Partial<Tuple<Required<Opt>>>
                            ]
                            : [
                                ...Tuple<Req>,
                                ...Partial<Opt>
                            ]
                        : never
                    : never
                : Tuple<[...T]>
        : T extends Dictionary
            ? HasOptionalElements<T> extends true
                ? IsTrue<O> extends true
                    ? ProcessDict<Required<T>> extends infer Dict extends Dictionary
                        ? MakeKeysOptional<
                            Dict,
                            OptionalKeysTuple<T>
                        >
                        : never
                    : ExpandDictionary<
                WithKeys<T, OptionalKeys<T>> & ProcessDict<WithoutKeys<T, OptionalKeysTuple<T>>>
                    >
                : ProcessDict<T>
            : never;

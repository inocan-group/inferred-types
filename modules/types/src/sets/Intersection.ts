import type {
    As,
    Container,
    Contains,
    Dictionary,
    Each,
    Err,
    ExpandDictionary,
    Find,
    GetEach,
    If,
    IsDictionary,
    IsEqual,
    IsLiteralLike,
    IsNever,
    IsSameContainerType,
    IsWideContainer,
    MixObjects,
    Or,
    UnionFrom,
    Values
} from "inferred-types/types";

/** compare objects with offset property */
type CompareWithOffset<
    A extends readonly unknown[],
    B extends readonly unknown[],
    O extends string,
    Result extends readonly unknown[] = [],
> = A extends [infer AType, ...infer Rest]
    ? GetEach<B, O> extends infer _BOffset extends readonly unknown[]
        ? O extends keyof AType
            ? Find<B, "objectKeyEquals", [O, AType[O]]> extends infer Found extends Dictionary
                ? CompareWithOffset<
                    Rest,
                    B,
                    O,
                    [
                        ...Result,
                        MixObjects<Found, As<AType, Dictionary>>
                    ]
                >
                : CompareWithOffset<Rest, B, O, Result>
            : CompareWithOffset<Rest, B, O, Result>
        : never
    : ExpandDictionary<Result>;

/** Improved detection for wide container values */
type DetectValues<
    A extends readonly unknown[],
    B extends readonly unknown[],
> = A extends (infer AT)[]
    ? B extends (infer BT)[]
        ? IsLiteralLike<A> extends true
            ? Each<Values<A>, "isLiteral"> extends true
                ? UnionFrom<A>[]
                : A[number][]
            : IsLiteralLike<B> extends true
                ? Each<Values<B>, "isLiteral"> extends true
                    ? UnionFrom<B>[]
                    : B[number][]
                : If<
                    IsNever<AT & BT>,
                    [],
                    (AT & BT)[]
                >
        : unknown[]
    : unknown[];

// Compare values for dictionaries/objects - only check for exact matches
type CompareObjectValues<
    AValues extends readonly unknown[],
    BValues extends readonly unknown[],
    Result extends readonly unknown[] = []
> = AValues extends readonly [infer AHead, ...infer ATail]
    ? ExistsInArrayExact<AHead, BValues> extends true
        ? Contains<Result, AHead> extends true
            ? CompareObjectValues<ATail, BValues, Result>
            : CompareObjectValues<ATail, BValues, [...Result, AHead]>
        : CompareObjectValues<ATail, BValues, Result>
    : Result;

// Helper to check if exact value exists in array (no intersection)
type ExistsInArrayExact<
    Value,
    B extends readonly unknown[]
> = B extends readonly [infer BHead, ...infer BTail]
    ? IsEqual<Value, BHead> extends true
        ? true
        : ExistsInArrayExact<Value, BTail>
    : false;

/**
 * **Intersection**`<A,B,[O]>`
 *
 * Compares the _values_ in `A` and `B` and returns the set of values found in both.
 *
 * - the `O` generic allows you to add an _offset_ which will be used on each element in the values
 *     - when an offset is used the result will be an array of that properties value when both
 *     `A` and `B` contain that value.
 * - this utility _can_ be used on both tuples/arrays and dictionaries but has more utility when
 * used with tuples/arrays. If you're considering using this with an object consider whether
 * `IntersectingKeys` might be a better option.
 *
 * #### Union Handling
 * - if both `A` and `B` are union types then the union type itself must be the same
 * - if one of `A` or `B` is a union type then the intersection type is the type of the
 * non-union member made to be _optional_
 */
export type Intersection<
    A extends Container,
    B extends Container,
    O extends null | string = null
> = IsSameContainerType<A, B> extends true
    ? Or<[IsWideContainer<A>, IsWideContainer<B>]> extends true
        ? IsDictionary<A> extends true
            ? IsDictionary<B> extends true
                ? DetectValues<
                    Values<A>,
                    Values<B>
                >
                : never
            : DetectValues<
                [...As<A, readonly unknown[]>],
                [...As<B, readonly unknown[]>]
            >
        // Narrow Containers
        : A extends readonly unknown[]
            ? B extends readonly unknown[]
                ? O extends null
                    ? Compare<
                        [...A],
                        As<B, readonly unknown[]>
                    >
                    : CompareWithOffset<A, B, As<O, string>>
                : never
            : CompareObjectValues<
                Values<A>,
                Values<B>
            >
    : Err<
        `invalid-comparison/keys`,
        `The Intersection<A,B> utility works when both A and B are the same type of container but that was not the case!`,
        { a: A; b: B }
    >;

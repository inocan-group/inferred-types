import { Each, First, UnionFrom, Values, Widen } from "inferred-types/types";
import { Container, Dictionary } from "types/base-types";
import { As, Contains, If, IsDictionary, IsEqual, IsLiteral, IsNever, IsSameContainerType, IsWideContainer, Or, Xor } from "types/boolean-logic";
import { Err } from "types/errors";

// Helper to get type intersection
type TypeIntersection<A, B> = A & B extends never ? never : A & B;

// Helper to check if a value or its intersection exists in array B
type ExistsInArray<
    Value,
    B extends readonly unknown[]
> = B extends readonly [infer BHead, ...infer BTail]
    ? IsEqual<Value, BHead> extends true
        ? true
        : [Value] extends [BHead]
            ? [BHead] extends [Value]
                ? true  // Found exact match (handles edge cases)
                : IsNever<TypeIntersection<Value, BHead>> extends true
                    ? ExistsInArray<Value, BTail>
                    : true  // Found intersection
            : IsNever<TypeIntersection<Value, BHead>> extends true
                ? ExistsInArray<Value, BTail>
                : true  // Found intersection
    : false;

// Get the intersection value when comparing with B (returns exact match if found, otherwise intersection)
type GetIntersectionValue<
    Value,
    B extends readonly unknown[],
    Found extends boolean = false
> = B extends readonly [infer BHead, ...infer BTail]
    ? IsEqual<Value, BHead> extends true
        ? Value  // Exact match found, return original value
        : IsNever<TypeIntersection<Value, BHead>> extends true
            ? GetIntersectionValue<Value, BTail, false>  // No intersection, continue searching
            : Found extends true
                ? GetIntersectionValue<Value, BTail, true>  // Already found intersection, keep searching for exact match
                : TypeIntersection<Value, BHead>  // Return first intersection found
    : never;

// Check if value already exists in result to prevent duplicates
type AlreadyInResult<
    Value,
    Result extends readonly unknown[]
> = Contains<Result,Value>;

// Main comparison function for narrow containers
type Compare<
    A extends readonly unknown[],
    B extends readonly unknown[],
    O extends null | PropertyKey,
    Result extends readonly unknown[] = []
> = A extends readonly [infer Head, ...infer Tail]
        ? O extends null
            ? ExistsInArray<Head, B> extends true
                ? AlreadyInResult<GetIntersectionValue<Head, B>, Result> extends true
                    ? Compare<Tail, B, O, Result>  // Skip duplicates
                    : Compare<Tail, B, O, [...Result, GetIntersectionValue<Head, B>]>
                : Compare<Tail, B, O, Result>
            : O extends keyof Head
                ? CompareWithOffset<Head, B, O, Result, Tail, B>
                : Compare<Tail, B, O, Result>
        : Result;

// Helper type to compare objects with offset property across all elements in B
type CompareWithOffset<
    Head,
    B extends readonly unknown[],
    O extends PropertyKey,
    Result extends readonly unknown[],
    Tail extends readonly unknown[],
    OriginalB extends readonly unknown[] = B
> = B extends readonly [infer BHead, ...infer BTail]
    ? O extends keyof Head
        ? O extends keyof BHead
            ? IsEqual<Head[O], BHead[O]> extends true
                ? AlreadyInResult<Head[O], Result> extends true
                    ? CompareWithOffset<Head, BTail, O, Result, Tail, OriginalB>
                    : CompareWithOffset<Tail, OriginalB, O, [...Result, Head[O]], [], OriginalB>
                : CompareWithOffset<Head, BTail, O, Result, Tail, OriginalB>
            : CompareWithOffset<Head, BTail, O, Result, Tail, OriginalB>
        : CompareWithOffset<Head, BTail, O, Result, Tail, OriginalB>
    : Compare<Tail, OriginalB, O, Result>;

// Improved detection for wide container values
type DetectValues<
    A extends readonly unknown[],
    B extends readonly unknown[],
> = A extends (infer AT)[]
? B extends (infer BT)[]
    ? IsLiteral<A> extends true
        ? Each<Values<A>, "isLiteral"> extends true
            ? UnionFrom<A>[]
            : A[number][]
        : IsLiteral<B> extends true
        ? Each<Values<B>, "isLiteral"> extends true
            ? UnionFrom<B>[]
            : B[number][]
        : If<
            IsNever<AT&BT>,
            [],
            (AT&BT)[]
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
        ? AlreadyInResult<AHead, Result> extends true
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
 */
export type Intersection<
    A extends Container,
    B extends Container,
    O extends null | PropertyKey = null
> = IsSameContainerType<A,B> extends true
? Or<[IsWideContainer<A>, IsWideContainer<B>]> extends true
    ? IsDictionary<A> extends true
        ? DetectValues<
            Values<A>,
            Values<As<B,Dictionary>>
        >
        : DetectValues<
            [...As<A, readonly unknown[]>],
            [...As<B, readonly unknown[]>]
        >
    : A extends readonly unknown[]
        ? Compare<
            A,
            As<B, readonly unknown[]>,
            O
        >
        : CompareObjectValues<
            Values<A>,
            Values<B>
        >
: Err<
    `invalid-comparison/keys`,
    `The Intersection<A,B> utility works when both A and B are the same type of container but that was not the case!`,
    { a: A, b: B }
>

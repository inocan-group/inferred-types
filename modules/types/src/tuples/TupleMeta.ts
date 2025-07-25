import type {
    And,
    As,
    GetNonVariadicLength,
    GetOptionalElementCount,
    GetRequiredElementCount,
    If,
    IsEqual,
    IsWideContainer,
    Length,
    MaxLength,
    MaxSafeInteger,
    MinLength,
    NotEqual
} from "inferred-types/types";

/**
 * **TupleMeta**`<T>`
 *
 * Provides metadata about the passed in array/tuple in `T`
 * including:
 *
 * - `range`
 * - `minLength`
 * - `maxLength`
 * - `length`
 * - `isOptional`
 * - `isEmpty`
 * - `isVariadic`
 * - `hasOptionalElements`
 */
export type TupleMeta<T extends readonly unknown[] = readonly unknown[]> = {
    /** textual description of the range of lengths available */
    range: And<[
        IsEqual<MinLength<T>, 0>,
        IsEqual<MaxLength<T>, 0>,
    ]> extends true
        ? `empty`
        : `[ ${MinLength<T>}..${If<IsEqual<MaxLength<T>, number>, "*", As<MaxLength<T>, number>>} ]`;
    minLength: As<MinLength<T>, number>;
    /**
     * The maximum allowable length which this Tuple can take on.
     *
     * - If the tuple is unbounded because the last element is typed
     * as a _variadic_ type then this value will be set to the `MaxSafeInteger`
     * value as this is the largest value that can be represented by **number**.
     */
    maxLength: As<
        IsEqual<MaxLength<T>, number> extends true
            ? MaxSafeInteger
            : MaxLength<T>,
        number
    >;
    length: Length<T>;
    /**
     * The length of `T` after stripping off the _variadic_ tail.
     *
     * - if there is no variadic tail on `T` then this number will match `length`
     */
    nonVariadicLength: GetNonVariadicLength<T>;
    /**
     * whether or not `T` has a _variadic_ tail
     */
    isVariadic: IsEqual<MaxLength<T>, number>;
    /**
     * whether the tuple/array is consider to be "wide"
     * which means that the number of elements is **not** fixed
     */
    isWide: IsWideContainer<T>;
    /**
     * if the minimum length of `T` is 0 then this
     * property will be `true`.
     */
    isOptional: IsEqual<MinLength<T>, 0>;
    /**
     * if both **min** and **max** length are 0 then this is
     * set as `true`.
     */
    isEmpty: And<[
        IsEqual<MinLength<T>, 0>,
        IsEqual<MaxLength<T>, 0>,
    ]>;
    /**
     * has one or more _optional_ elements defined (e.g., defined with
     * the `?` modifier)
     */
    hasOptionalElements: NotEqual<Required<T>, T>;
    /**
     * a numeric count of the elements which are of the required type
     * (e.g., do not have a `?` modifier)
     */
    requiredElementCount: GetRequiredElementCount<T>;
    /**
     * a numeric count of the elements which are of the optional type
     * (e.g., marked with the `?` modifier)
     */
    optionalElementCount: GetOptionalElementCount<T>;
};

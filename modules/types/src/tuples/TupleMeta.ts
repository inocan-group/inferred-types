import {
    And,
    As,
    If,
    IsEqual,
    IsWideContainer,
    Length,
    MaxLength,
    MaxSafeInteger,
    MinLength
} from "inferred-types/types"


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
 */
export type TupleMeta<T extends readonly unknown[] = any> = {
    /** textual description of the range of lengths available */
    range: And<[
        IsEqual<MinLength<T>, 0>,
        IsEqual<MaxLength<T>, 0>,
    ]> extends true
    ? `empty`
    : `[ ${MinLength<T>}..${If<IsEqual<MaxLength<T>, number>, "*", As<MaxLength<T>, number>>} ]`,
    minLength: As<MinLength<T>, number>,
    /**
     * The maximum allowable length which this Tuple can take on.
     *
     * - If the tuple is unbounded because the last element is typed
     * as a _variatic_ type then this value will be set to the `MaxSafeInteger`
     * value as this is the largest value that can be represented by **number**.
     */
    maxLength: As<
        IsEqual<MaxLength<T>, number> extends true
        ? MaxSafeInteger
        : MaxLength<T>,
        number
    >
    length: Length<T>,
    isUnbounded: IsEqual<MaxLength<T>, number>,
    /**
     * whether the tuple/array is consider to be "wide"
     * which means that the number of elements is **not** fixed
     */
    isWide: IsWideContainer<T>,
    isOptional: IsEqual<MinLength<T>, 0>,
    isEmpty: And<[
        IsEqual<MinLength<T>, 0>,
        IsEqual<MaxLength<T>, 0>,
    ]>
}

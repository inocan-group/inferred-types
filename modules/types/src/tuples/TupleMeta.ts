import {
    And,
    As,
    If,
    IsEqual,
    Length,
    MaxLength,
    MinLength
 } from "inferred-types/types"



export type TupleMeta<T extends readonly unknown[]> = {
    /** textual description of the range of lengths available */
    range: And<[
        IsEqual<MinLength<T>,0>,
        IsEqual<MaxLength<T>,0>,
    ]> extends true
        ? `empty`
        : `[ ${MinLength<T>}..${If<IsEqual<MaxLength<T>, number>, "*", As<MaxLength<T>, number>>} ]`,
    minLength: MinLength<T>,
    maxLength: MaxLength<T>,
    length: Length<T>,
    isUnbounded: IsEqual<MaxLength<T>, number>,
    isOptional: IsEqual<MinLength<T>,0>,
    isEmpty: And<[
        IsEqual<MinLength<T>,0>,
        IsEqual<MaxLength<T>,0>,
    ]>
}

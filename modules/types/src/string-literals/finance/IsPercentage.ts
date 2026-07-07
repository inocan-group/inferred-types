import type { Err, IsBetweenInclusively } from "inferred-types/types";
import type { Percentage } from "./Percentage";

export type Process<
    T extends number,
    TMin extends number,
    TMax extends number
> = IsBetweenInclusively<T, TMin, TMax>;

export type IsDefaultNumericPercentage<T extends number> = `${T}` extends `-${string}`
    ? false
    : T extends 0 | 1
        ? true
        : `${T}` extends `0.${string}`
            ? true
            : false;

export type HandleErr<
    T,
    TMin,
    TMax
> = T extends string
    ? Err<
        `invalid-type/percentage`,
        `A string literal '${T}' was passed into IsPercentage<T> but it did not match the expected pattern provided by the 'Percentage' format.`,
        { input: T; min: TMin; max: TMax }
    >
    : Err<
        `invalid-type/percentage`,
        `The IsPercentage<T> boolean operator received the wrong type for T! T must be a string or number and if a number should follow the 'Percentage' shape with a trailing '%' character.`,
        { input: T; min: TMin; max: TMax }
    >;

/**
 * **IsPercentage**`<T, [TMin = 0], [TMax = 100]>`
 *
 * Boolean operator which tests whether `T` represents a valid
 * percentage.
 *
 * - the `TMin` and `TMax` optional parameters allow adjusting the
 *   expected/allowed percentage range but default to 0-100 percent.
 * - the base types which will be evaluated are _strings_ and _numbers_
 *      - if a _number_ is present then the percentage is expected to be
 *        a numeric value where the "percentage" is represented as a number
 *        between `${TMin}/100` to `${TMax}/100`.
 *      - if a _string_ is present it will expect a literal value of the shape
 *        of `${number}%`.
 *      - a wide string passed in as `T` will convert to `Percentage | Error` union type
 *      - a wide number passed in as `T` will convert to `number | Error` union type
 *
 * ```ts
 * // true
 * type T1 = IsPercentage<"50%">;
 * type T2 = IsPercentage<0.5>;
 * // false
 * type F1 = IsPercentage<"150%">;
 * type F2 = IsPercentage<50>;
 * ```
 *
 * Note:
 * - if a type other than _number_ or _string_ is passed in for `T` then this utility
 *   will return an Error of the type `invalid-type/percentage`
 * - likewise, if a string literal is passed in with a type that doesn't extend the
 *   shape defined by `Percentage` then an error of `invalid-type/percentage` will
 *   also be returned.
 * - if you want to avoid errors and ONLY get a true/false value then wrap this
 *   utility with `AssertTrue`
 */
export type IsPercentage<
    T,
    TMin extends number = 0,
    TMax extends number = 100
> = string extends T
    ? Percentage | Error
    : number extends T
        ? number | Error
        : T extends `${infer Num extends number}%`
            ? Process<Num, TMin, TMax>
            : T extends number
                ? TMin extends 0
                    ? TMax extends 100
                        ? IsDefaultNumericPercentage<T>
                        : boolean
                    : boolean
                : HandleErr<T, TMin, TMax>;

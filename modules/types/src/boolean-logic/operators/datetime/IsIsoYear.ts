import type {
    And,
    FourDigitYear,
    IsAny,
    IsNever,
    IsObject,
    IsUnion,
    Or,
    UnionToTuple,
} from "inferred-types/types";

/**
 * - if all elements in the tuple are valid ISO year's then returns `true`,
 * - if some of the elements in the tuple are valid ISO year's then returns `boolean`
 * - otherwise return false.
 */
type CheckUnion<
    T
> = T extends readonly string[]

    ? And<{
        [K in keyof T]: T[K] extends `${number}`
            ? FourDigitYear<T[K]> extends Error
                ? false
                : true
            : false
    }> extends true
        ? true
        : Or<{
            [K in keyof T]: T[K] extends `${number}`
                ? FourDigitYear<T[K]> extends Error
                    ? false
                    : true
                : false
        }> extends true
            ? boolean
            : false
    : false;

/**
 * **IsIsoYear**`<T>`
 *
 * Boolean operator which tests whether `T` is a ISO Year (
 * a four digit year)
 */
export type IsIsoYear<T>
= [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : IsObject<T> extends true
            ? false
            : string extends T
                ? boolean
                : [IsUnion<T>] extends [true]
                    ? CheckUnion<UnionToTuple<T>>

                    : T extends `${number}`
                        ? FourDigitYear<T> extends Error
                            ? false
                            : true
                        : false;

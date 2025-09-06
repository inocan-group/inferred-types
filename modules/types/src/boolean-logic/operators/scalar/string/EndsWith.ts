import type { IsAny, IsEqual, IsNever, IsUnion, IsUnknown, Or, ToStringArray } from "inferred-types/types";

type Check<
    TValue extends string,
    TComparator extends readonly string[],
> = Or<{
    [K in keyof TComparator]: TValue extends `${string}${TComparator[K]}`
        ? IsEqual<TComparator[K], ""> extends true
            ? false
            : true
        : false;
}>;

/**
 * **EndsWith**<TValue, TComparator>
 *
 * A type utility which checks whether `TValue` _ends with_ the
 * value of `TComparator`.
 *
 * - numeric values for `TValue` will be converted into string literals
 * prior to comparison
 * - a tuple value in `TComparator` is allowed and will test whether
 * _at least one_ type Ends the sequence for TValue
 */
export type EndsWith<
    TValue extends string | number,
    TComparator extends string | number | readonly (string | number)[],
> = [IsUnion<TComparator>] extends [true]
    ? `${TValue}` extends `${string}${TComparator}`
        ? true
        : false
    : [IsAny<TValue>] extends [true]
        ? false
        : [IsNever<TValue>] extends [true]
            ? false
            : [IsUnknown<TValue>] extends [true]
                ? boolean
                : string extends TValue
                    ? boolean
                    : number extends TValue
                        ? boolean
                        : number extends TComparator
                            ? boolean
                            : string extends TComparator
                                ? boolean
                                : Check<
    `${TValue}`,
    TComparator extends readonly (string | number)[]
        ? ToStringArray<TComparator>
        : TComparator extends (string | number)
            ? [`${TComparator}`]
            : never
                                >;

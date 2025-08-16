import type {
    FirstChar,
    IsAny,
    IsEqual,
    IsNever,
    IsUnion,
    IsUnknown,
    Or,
    ToStringArray,
} from "inferred-types/types";

type Check<
    TValue extends string,
    TComparator extends readonly string[],
> = Or<{
    [K in keyof TComparator]: TValue extends `${TComparator[K]}${string}`
        ? IsEqual<TComparator[K], ""> extends true
            ? false
            : true
        : false;
}>;

/**
 * **StartsWith**<TValue, TComparator>
 *
 * A type utility which checks whether `TValue` _starts with_ the
 * value of `TComparator`.
 *
 * - numeric values for `TValue` will be converted into string literals
 * prior to comparison
 * - a tuple value in `TComparator` is allowed and will test whether
 * _any_ of the patterns start `TValue`
 * - a union type for `TComparator` is allowed so long as it's only for a single character
 *    - this can be much more type efficient for unions with lots of characters
 *    - if you need larger pattern matches then use a Tuple for `TComparator`
 *
 */
export type StartsWith<
    TValue extends string | number,
    TComparator extends string | number | readonly (string | number)[],
>
= [IsUnion<TComparator>] extends [true]
    ? FirstChar<`${TValue}`> extends TComparator
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

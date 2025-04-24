import type { AsString, IsStringLiteral, IsWideType, Or } from "inferred-types/types";

type Test<
    TValue extends string,
    TComparator extends string,
> = TValue extends `${string}${TComparator}`
    ? true
    : false;

type Process<
    TValue extends string,
    TComparator extends string,
> = IsStringLiteral<TComparator> extends true
    ? IsStringLiteral<TValue> extends true // both literals
        ? Test<TValue, TComparator>
        : boolean
    : boolean;

type ProcessEach<
    TValue extends string,
    TComparator extends readonly string[],
> = Or<{
    [K in keyof TComparator]: Process<TValue, TComparator[K]>
}>;

type PreProcess<
    TValue extends string,
    TComparator extends string | readonly string[],
> = TComparator extends readonly string[]
    ? ProcessEach<TValue, TComparator>
    : TComparator extends string
        ? Process<TValue, TComparator>
        : never;

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
    TComparator extends string | number | readonly string[],
> = [IsWideType<TValue>] extends [true]
    ? boolean
    : [IsWideType<TComparator>] extends [true]
        ? boolean
    : PreProcess<
        AsString<TValue>,
        TComparator extends number
            ? AsString<TComparator>
            : TComparator
    >;

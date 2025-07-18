import type {
    AsArray,
    AsString,
    IsEqual,
    IsWideType,
    TupleToUnion,
} from "inferred-types/types";

type Check<
    TValue extends string,
    TComparator extends string | number,
> = TComparator extends ""
    ? false
    : [TValue] extends [`${TComparator}${string}`]
        ? true
        : false;

type Process<
    TValue extends string,
    TComparator extends string | number | readonly string[],
> = TComparator extends readonly string[]
    ? Check<
        [TValue] extends [number] ? `${TValue}` : TValue,
        TupleToUnion<TComparator>
    >
    : Check<
        [TValue] extends [number] ? `${TValue}` : TValue,
        AsString<TComparator>
    >;

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
 */
export type StartsWith<
    TValue extends string | number,
    TComparator extends string | number | readonly (string | number)[],
> = [IsWideType<TValue>] extends [true]
    ? boolean
    : [IsWideType<TComparator>] extends [true]
        ? boolean
        :

        IsEqual<
            Process<AsString<TValue>, AsArray<TComparator>[number]>,
            boolean
        > extends true
            ? true
            : Process<
                AsString<TValue>,
                AsArray<TComparator>[number]
            >;

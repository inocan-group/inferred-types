import {
    Length,
    IsLessThan,
    IsGreaterThan,
    Or
} from "inferred-types/types";

/**
 * **LengthInRange**`<TTest,TMin,[TInvalid]>`
 *
 * A validation function that checks that the _length_ of `TTest`
 * is at least that of `TMin` _and_ and no more than length of `TMax`
 */
export type LengthInRange<
    T extends string | number | readonly any[],
    TMin extends number,
    TMax extends number,
    TInvalid = never
> = Or<[
    IsLessThan<Length<T>, TMin>,
    IsGreaterThan<Length<T>, TMax>
]> extends true
? TInvalid
: T;

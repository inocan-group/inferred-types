import type { Abs, FixedLengthArray, IsNegativeNumber } from "inferred-types/types";

type Repeater<
    TStr extends string,
    TTup extends readonly string[],
    TResult extends string = ""
> = TTup extends [infer Head extends string, ...infer Rest extends readonly string[]]
    ? Repeater<
        TStr,
        Rest,
    `${TResult}${Head}`
    >
    : TResult;

/**
 * **Repeat**`<TStr,TCount>`
 *
 * Creates a string literal by repeating a given string -- `TStr` -- `TCount` times.
 */
export type Repeat<
    TStr extends string,
    TCount extends number
> = number extends TCount
    ? string
    : TCount extends 0
        ? ""
        : IsNegativeNumber<TCount> extends true
            ? Repeater<
                TStr,
                FixedLengthArray<TStr, Abs<TCount>>
            >

            : Repeater<
                TStr,
                FixedLengthArray<TStr, TCount>
            >;

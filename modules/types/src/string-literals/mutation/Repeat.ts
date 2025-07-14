import type { Abs, AfterFirst, FixedLengthArray, IsNegativeNumber } from "inferred-types/types";

type Repeater<
    TStr extends string,
    TTup extends readonly unknown[],
    TResult extends string = ""
> = [] extends TTup
    ? TResult
    : Repeater<
        TStr,
        AfterFirst<TTup>,
    `${TResult}${TStr}`
    >;

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
                FixedLengthArray<".", Abs<TCount>>
            >

            : Repeater<
                TStr,
                FixedLengthArray<".", TCount>
            >;


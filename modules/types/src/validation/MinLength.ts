import { CompareNumbers, Length } from "inferred-types/types";

/**
 * **MinLength**`<TTest,TMin,[TInvalid]>`
 *
 * A validation function that checks that the _length_ of `TTest`
 * is at least that of `TMin`.
 */
export type MinLength<
    TTest extends string | number | readonly any[],
    TMin extends number,
    TInvalid = never
> = CompareNumbers<Length<TTest>, TMin> extends "less"
? TInvalid
: TTest;

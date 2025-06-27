import type { CompareNumbers, Length } from "inferred-types/types";

/**
 * **EnsureMinLength**`<TTest,TMin,[TInvalid]>`
 *
 * A validation function that checks that the _length_ of `TTest`
 * is at least that of `TMin`.
 */
export type EnsureMinLength<
    TTest extends string | number | readonly unknown[],
    TMin extends number,
    TInvalid = never
> = CompareNumbers<Length<TTest>, TMin> extends "less"
    ? TInvalid
    : TTest;

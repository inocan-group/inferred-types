import type {
    CompareNumbers,
    Err,
    IsWideNumber,
    IsWideType,
    Length,
    Or
} from "inferred-types/types";

/**
 * **EnsureMaxLength**`<TTest,TMax,[TInvalid]>`
 *
 * A validation function that checks that the _length_ of `TTest`
 * is at most that of `TMax`.
 */
export type EnsureMaxLength<
    TTest extends string | number | readonly any[],
    TMax extends number,
    TInvalid = never
> = Or<[
    IsWideNumber<TMax>,
    IsWideType<TTest>
]> extends true
    ? Err<
        `invalid-verifier`,
        `MaxLength<TTest, TMax> requires that both generics be literal values but at least one is a wide type!`,
        { test: TTest; max: TMax }
    >
    : CompareNumbers<Length<TTest>, TMax> extends "greater"
        ? TInvalid
        : TTest;

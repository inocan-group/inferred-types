import type { And, IsGreaterThan, IsInteger } from "types/boolean-logic";
import type { Multiply } from "types/numeric-literals";
import type { Precision } from "types/numeric-literals/Precision";

type _Compare<
    A extends number,
    B extends number,
    TCount extends number[] = []
> = A extends B
    ? "equal"
    : TCount["length"] extends A
        ? "less"
        : TCount["length"] extends B
            ? "greater"
            : _Compare<A, B, [...TCount, 0]>;

type PrecisionMultiplier<A extends number, B extends number> = And<[
    IsInteger<A>,
    IsInteger<B>
]> extends true
    ? 1
    : IsGreaterThan<Precision<A>, Precision<B>> extends true
        ? Multiply<Precision<A>, 10>
        : Multiply<Precision<B>, 10>;

/**
 * **Compare**`<A,B>`
 *
 * Compares two numbers -- `A` and `B` -- and reports back
 * the numeric relationship `A` _has to_ `B`.
 *
 * Values are:
 *
 * - `equal`
 * - `greater`
 * - `less`
 *
 * ```ts
 * // "greater"
 * Compare<5,4>
 * ```
 */
export type CompareNumbers<
    A extends number,
    B extends number
> = And<[
    IsInteger<A>,
    IsInteger<B>
]> extends true
    ? _Compare<A, B>
    : _Compare<
        A,
        B
    >;

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
> = _Compare<A, B>;

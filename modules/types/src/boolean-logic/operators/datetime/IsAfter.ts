import type {
    AsEpoch,
    DateLike,
    Err,
    Extends,
    IsGreaterThan,
    Not,
    Or,
    ParseDate,
    ParsedDate,
} from "inferred-types/types";

/**
 * **IsAfter**`<A,B>`
 *
 * Tests whether `A` is _after_ (in time) `B`.
 */
export type IsAfter<
    A,
    B,
> = Or<[
    Not<Extends<A, DateLike>>,
    Not<Extends<B, DateLike>>,
]> extends true
    ? Err<
        `invalid-date/is-after`,
        `The IsAfter<A,B> utility expects both parameters to extend the DateLike type but at least one s not!`,
        { a: A; b: B }
    >
    : A extends object
        ? boolean
    : B extends object
        ? boolean
    : string extends A
        ? boolean
    : string extends B
        ? boolean
        : ParseDate<A> extends ParsedDate
            ? ParseDate<B> extends ParsedDate
                ? AsEpoch<A> extends number
                    ? AsEpoch<B> extends number
                        ? IsGreaterThan<
                            AsEpoch<A>,
                            AsEpoch<B>
                        >
            : Err<`invalid-date`>
        : Err<`invalid-date`>
    : Err<"uh oh">
: Err<"shit">;


import type { IsNegativeNumber } from "types/boolean-logic";
import type { Err } from "types/errors";
import type { First } from "types/lists";
import type { AddPositive, NumberLike } from "inferred-types/types";
import type { AsNumber } from "types/type-conversion";

export type Count<
    T extends readonly NumberLike[],
    U extends number = 0
> = [] extends T
    ? U
    : IsNegativeNumber<First<T>> extends true
        ? Err<
            `invalid-number/negative`,
            `the Sum<T> utility encountered a negative number; these are not support currently!`,
            { negative: First<T>; remaining: T; count: U }
        >
        : T extends [
            infer Head extends NumberLike,
            ...(infer Rest extends NumberLike[])
        ]
            ? Count<
                Rest,
                AsNumber<
                    AddPositive<
                        U,
                        Head
                    >
                >
            >
            : U
    ;

/**
 * **Sum**`<T>`
 *
 * Sums a tuple of positive numbers
 *
 */
export type Sum<
    T extends readonly NumberLike[]
> = Count<T>;

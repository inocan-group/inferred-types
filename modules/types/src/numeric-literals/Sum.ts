import type { Add, NumberLike } from "inferred-types/types";
import type { IsNegativeNumber } from "types/boolean-logic";
import type { Err } from "types/errors";
import type { AsNumber } from "types/type-conversion";

export type Count<
    T extends readonly NumberLike[],
    U extends number = 0
> = number extends T["length"]
    ? number
    : T extends readonly []
    ? U
    : T extends readonly [
        infer Head extends NumberLike,
        ...(infer Rest extends NumberLike[])
    ]
        ? IsNegativeNumber<Head> extends true
            ? Err<
                `invalid-number/negative`,
                `the Sum<T> utility encountered a negative number; these are not support currently!`,
                { negative: Head; remaining: T; count: U }
            >
            : Add<U, Head> extends infer Next extends NumberLike
                ? Count<Rest, AsNumber<Next>>
                : never
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

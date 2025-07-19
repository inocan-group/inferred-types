import { IsNegativeNumber } from "types/boolean-logic";
import { Err } from "types/errors";
import {  First } from "types/lists";
import { AddPositive } from "types/numeric-literals/AddPositive";
import { NumberLike } from "types/numeric-literals/NumberLike";
import { AsNumber } from "types/type-conversion";



export type Count<
    T extends readonly NumberLike[],
    U extends number = 0
> = [] extends T
? U
: IsNegativeNumber<First<T>> extends true
        ? Err<
            `invalid-number/negative`,
            `the Sum<T> utility encountered a negative number; these are not support currently!`,
            { negative: First<T>, remaining: T, count: U }
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

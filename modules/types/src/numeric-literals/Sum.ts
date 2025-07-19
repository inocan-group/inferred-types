import { Add } from "types/numeric-literals/Add";

/**
 * **Sum**`<T>`
 *
 * Sums all the numbers in the passed in tuple `T`.
 *
 * This implementation uses a direct reduction approach
 * to sum all numbers in the array efficiently.
 */
/**
 * **Sum**`<T>`
 *
 * Sums all the non-negative numbers in the passed in tuple `T`.
 * Any negative numbers will cause a type error.
 */
type IsNegative<N extends number> = `${N}` extends `-${number}` ? true : false;

export type Sum<
    T extends readonly number[]
> = T extends readonly []
    ? 0
    : T extends readonly [infer H extends number]
        ? IsNegative<H> extends true
            ? never
            : H
        : T extends readonly [
            infer H1 extends number,
            infer H2 extends number,
            ...infer Rest extends readonly number[]
        ]
            ? IsNegative<H1> extends true
                ? never
                : IsNegative<H2> extends true
                    ? never
                    : Sum<[Add<H1, H2>, ...Rest]>
            : never;

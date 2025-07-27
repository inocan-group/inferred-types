import type {  AsNumber, NumberLike } from "inferred-types/types";


/**
 * Simple filter approach to avoid RemoveNever complexity
 */
type FilterNumeric<T extends readonly unknown[], Result extends readonly number[] = []> =
    T extends readonly [infer Head, ...infer Tail]
        ? Head extends NumberLike
            ? FilterNumeric<Tail, [...Result, AsNumber<Head>]>
            : FilterNumeric<Tail, Result>
        : Result;
/**
 * **AsNumericArray**`<T>`
 *
 * Converts into a numeric array:
 *
 * - `number` values are proxied through
 * - `${number}` values are converted to a number
 * - all other types are converted to `never` and removed
 */
export type AsNumericArray<T> = T extends readonly unknown[]
    ? FilterNumeric<T>
    : never;

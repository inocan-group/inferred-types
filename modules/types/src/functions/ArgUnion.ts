import { TypedFunction } from "inferred-types/types";

/**
 * **ArgUnion**`<T>`
 *
 * Converts the first
 */
export type ArgUnion<
    F extends TypedFunction,
    P extends readonly unknown[] = Parameters<F>
> = {
    [K in keyof P]: P[K] & string
};

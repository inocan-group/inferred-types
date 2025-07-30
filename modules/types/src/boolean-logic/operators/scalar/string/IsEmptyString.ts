import type { IsEqual, IsStringLiteral } from "inferred-types/types";

/**
 * **IsEmptyString**`<T>`
 *
 * Returns:
 * - `true` when string T is a literal _and_ equal to ""
 * - `boolean` when string T is wide
 * - `false` for all other conditions
 */
export type IsEmptyString<T> = T extends string
    ? IsStringLiteral<T> extends true
        ? IsEqual<T, ""> extends true
            ? true
            : false
        : boolean
    : false;

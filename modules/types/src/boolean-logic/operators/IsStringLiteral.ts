import type { IsEqual, IsNever } from "inferred-types/types";

/**
 * **IsStringLiteral**`<T>`
 *
 * Boolean type utility which detects whether `T` is
 * a string literal.
 */
export type IsStringLiteral<T> = IsNever<T> extends true
    ? false
    : T extends string
        ? IsEqual<T, string> extends true
            ? false
            : true
        : false;

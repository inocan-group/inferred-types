import type { ElementOf, IsEqual, IsUnion } from "inferred-types/types";

/**
 * **IsUnionArray**`<T>`
 *
 * Boolean operator which tests whether `T` is an array of
 * a _union type_.
 */
export type IsUnionArray<T> = T extends readonly any[]
    ? IsEqual<T["length"], number> extends true
        ? IsUnion<ElementOf<T>> extends true
            ? true
            : false
        : false
    : false;

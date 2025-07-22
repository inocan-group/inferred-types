import type { Dictionary, IsNever } from "inferred-types/types";

/**
 * **IsContainer**`<T>`
 *
 * Boolean operator which detects whether `T` is a "container" where a
 * container is any object or array.
 */
export type IsContainer<T> = [IsNever<T>] extends [true]
    ? false
    : T extends null | undefined
        ? false
        : [T] extends [Dictionary]
            ? true
            : [T] extends [readonly any[]]
                ? true
                : false;


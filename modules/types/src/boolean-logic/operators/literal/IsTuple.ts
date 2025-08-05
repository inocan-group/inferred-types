import type { IsAny, IsNever, IsUnknown } from "inferred-types/types";

/**
 * **IsTuple**`<T>`
 *
 * A boolean operator which validates that `T` is a `Tuple`:
 *
 * - must extends `readonly any[]`,
 * - must have a _known_ number of elements
 */
export type IsTuple<T> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : [IsUnknown<T>] extends [true]
            ? boolean
            : [T] extends [readonly any[]]
                ? [number] extends [T["length"]]
                    ? false
                    : true
                : false;

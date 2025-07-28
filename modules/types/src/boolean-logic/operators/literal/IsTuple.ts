import { IsAny, IsNever } from "inferred-types/types";

/**
 * **IsTuple**`<T>`
 *
 * A boolean operator which validates that `T` is a `Tuple`:
 *
 * - must extends `readonly any[]`,
 * - must have a _known_ number of elements
 */
export type IsTuple<T> = [IsNever<T>] extends [true]
? false
: [IsAny<T>] extends [true]
? false
: [T] extends [readonly any[]]
? [number] extends [T['length']]
    ? false
    : true
: false;



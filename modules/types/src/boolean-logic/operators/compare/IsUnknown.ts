import type { IsAny, IsEqual, IsNever } from "types/boolean-logic";

/**
 * **IsUnknown**`<T>`
 *
 * Tests whether a given `T` is of the **unknown** type.
 */
export type IsUnknown<T> = [IsNever<T>] extends [true]
    ? false
    : [IsAny<T>] extends [true]
    ? false
    : IsEqual<T, unknown> extends true ? true : false;

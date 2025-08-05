import type { Contains, IsUnion, UnionToTuple } from "inferred-types/types";

type AnyError<
    T extends readonly unknown[],
> = Contains<T, Error> extends true
    ? true
    : Contains<T, Error> extends true
        ? true
        : false;

/**
 * **MaybeError**`<T>`
 *
 * Tests whether T is part of a union and if it is then
 * tests whether any element of that union is an error, where
 * an error is:
 *
 * - `ErrorCondition`
 * - extends JS's `Error` class
 *
 * MaybeError returns **false** if there _is_ an error; it is
 * positive only when it _might_ be an error.
 *
 * **Related**: `IsError`, `IsErrorCondition`
 */
export type MaybeError<T> = IsUnion<T> extends true
    ? AnyError<UnionToTuple<T>>
    : false;

;

import type { IsUnion } from "inferred-types/types";

type Process<U, Last = LastInUnion<U>> = [U] extends [never]
    ? []
    : [IsUnion<U>] extends [true]
        ? [Last, Exclude<U, Last>]
        : U;

/**
 * **ShiftUnion**`<U>`
 *
 * Takes a type `U` and returns a tuple of the form:
 * ```ts
 * [shifted, remaining]
 * ```
 *
 * Where `shifted` is the union segment which has been _removed_
 * and the `remaining` value is the value with that segment removed.
 *
 * **Note:**
 * - you should not presume any explicit _ordering_ for removing elements
 * from the union
 * - when calling `ShiftUnion`<U>` where `U` is _not_ a union you will
 * get the tuple `[never, U]`
 */
export type UnionShift<U, Last = LastInUnion<U>>
  = Process<U, Last> extends readonly unknown[]
      ? IsUnion<U> extends true ? [Last, Exclude<U, Last>] : U
      : [never, IsUnion<U> extends true ? [Last, Exclude<U, Last>] : U];

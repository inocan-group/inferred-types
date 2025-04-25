import { IsArray, IsTuple, IsUnion, UnionToTuple } from "inferred-types/types";


/**
 * **AsTuple**`<T>`
 *
 * Similar to `AsArray<T>` but will convert union types to tuples as well
 * as scalar values.
 */
export type AsTuple<T> = IsUnion<T> extends true
    ? UnionToTuple<T>
    : IsArray<T> extends true
        ? T
        : [T];

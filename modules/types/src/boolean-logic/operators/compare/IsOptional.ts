import type { Contains, IsUnion, UnionToTuple } from "inferred-types/types";

/**
 * Tests to see if `T` is a union type where one of the union members is
 * _undefined_.
 *
 * **Related:** `IsRequired`
 */
export type IsOptional<T> = IsUnion<T> extends true
    ? Contains<UnionToTuple<T>, undefined> extends true
        ? true
        : false
    : false;

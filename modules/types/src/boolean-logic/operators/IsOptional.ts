import type { Contains, IsUnion, Not, UnionToTuple } from "inferred-types/types";

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

/**
 * Tests to see if `T` is a union type and if it is, it validates that
 * none of the union members are _undefined_.
 *
 * - if `T` is explicitly typed as `undefined` this will report as **true**;
 * meaning it is required that it is of a certain type (aka, _undefined_)
 *
 * **Related:** `IsOptional`
 */
export type IsRequired<T> = Not<IsOptional<T>>;

import { IsUnion, TupleToUnion, UnionToTuple } from "inferred-types/dist/types/index";

type ConvertUnion<
  T extends readonly unknown[],
  THandle extends "drop" | "proxy"
> = TupleToUnion<{
  [K in keyof T]: T[K] extends string
    ? T[K]
    : T[K] extends number
    ? `${T[K]}`
    : T[K] extends boolean
    ? `${T[K]}`
    : THandle extends "drop"
      ? never
      : T[K];
}>

/**
 * **AsStringUnion**`<T, [THandle]>`
 *
 * A type conversion utility which ensures unions (and a few literals) are
 * converted to string literal variants:
 *
 * - if `T` is a union type, all _numeric_ or _boolean_ elements in the union
 * will be converted to a string literal equivalent and others will be dropped
 * - if you would prefer non-convertible types are left as part of the union
 * you can set the `THandle` to "proxy" (instead of the default "drop")
 *
 * For non-union types, the goal is to address a similar outcome which is:
 *
 * - if `T` is of type `number` or `boolean` then this is converted to a
 * string literal equivalent
 * - all other types result in `never` or are just proxied through if
 * `THandle` is set to "proxy"
 */
export type AsStringUnion<
  T,
  THandle extends "drop" | "proxy" = "drop"
> = IsUnion<T> extends true
? ConvertUnion<UnionToTuple<T>, THandle>
: T extends string
  ? T
  : T extends number
    ? `${T}`
  : T extends boolean
    ? `${T}`
    : THandle extends "drop"
      ? never
      : T;

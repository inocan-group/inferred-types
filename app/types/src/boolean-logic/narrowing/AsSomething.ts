import {
  IsUnion,
  Nothing,
  RemoveMarked,
  TupleToUnion,
  UnionToTuple
} from "@inferred-types/types";
import { Constant } from "@inferred-types/constants";

type Process<
  T extends readonly unknown[]
> = TupleToUnion<
RemoveMarked<{
  [K in keyof T]: T[K] extends Nothing
    ? Constant<"Marked">
    : T[K]
}>>;

/**
 * **AsSomething**`<T>`
 *
 * Narrowing utility which takes a type `T` and _if it's a union_
 * will narrow the union elements to no longer include `undefined`
 * or `null`.
 *
 * - If `T` is a non-union type then:
 *   - a `null` or `undefined` value will be mapped to `TNonUnion` (
 * which defaults to `never`)
 *   - all other values are just proxied through
 */
export type AsSomething<
  T,
  TNonUnion = never
> = IsUnion<T> extends true
? Process<UnionToTuple<T>>
: T extends Nothing
  ? TNonUnion
  : T;

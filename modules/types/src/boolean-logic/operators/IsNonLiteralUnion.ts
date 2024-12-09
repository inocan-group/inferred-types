import type { If, IsUnion, RetainLiterals, UnionToTuple } from "inferred-types/types";

type Process<T> = UnionToTuple<T> extends readonly unknown[]
  ? RetainLiterals<UnionToTuple<T>>["length"] extends UnionToTuple<T>["length"]
    ? false
    : true
  : never;

/**
 * **IsNonLiteralUnion**`<T>`
 *
 * Boolean utility which checks whether `T` is both a _union type_
 * and that none of it's elements are considered _literal types_.
 *
 * **Related:** `IsLiteralUnion`, `IsWideUnion`
 */
export type IsNonLiteralUnion<
  T,
> = If<
  IsUnion<T>,
  Process<T>,
  false
>;

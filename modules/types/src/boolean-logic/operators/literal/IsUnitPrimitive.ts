import { IsNarrower } from "inferred-types/types";

/**
 * **IsUnitPrimitive**`<T>`
 *
 * Boolean operator which tests that `T` is a singleton primitive type:
 *
 * - null, undefined
 * - literal string (not union)
 * - literal number (not union)
 * - literal bigint (not union)
 * - true, false
 * - unique symbols
 *
 * **Related:** `IsNarrower`, `IsLiteral`, `IsLiteralLike`, `IsLiteralUnion`
 */
export type IsUnitPrimitive<T> =
  [T] extends [null | undefined] ? true :
  IsNarrower<T, string>  extends true ? true :
  IsNarrower<T, number>  extends true ? true :
  IsNarrower<T, boolean> extends true ? true :
  IsNarrower<T, bigint>  extends true ? true :
  // unique symbol is narrower than symbol; plain `symbol` is not
  IsNarrower<T, symbol>  extends true ? true :
  false;

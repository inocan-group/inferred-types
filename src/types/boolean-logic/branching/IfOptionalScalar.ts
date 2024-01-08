import { IsScalar } from "../..";

/**
 * **IfOptionalScalar**`<T, IF, ELSE>`
 *
 * Branch type utility which returns `IF` when `T` is a scalar value _or_ `undefined`
 * and `ELSE` otherwise
 */
export type IfOptionalScalar<
  T,
  IF,
  ELSE
> = IsScalar<T> extends true ? IF : ELSE;

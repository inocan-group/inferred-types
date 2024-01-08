import { IsScalar } from "../..";

/**
 * **IfScalar**`<T, IF, ELSE>`
 *
 * Branch type utility which returns `IF` when `T` is a scalar value 
 * (aka, string, number, or boolean) and `ELSE` otherwise
 */
export type IfScalar<
  T,
  IF,
  ELSE
> = IsScalar<T> extends true ? IF : ELSE;

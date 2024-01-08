import { IfNever, IsUndefined } from "../..";

/**
 * **IfUndefined**`<T, IF, [ELSE]>`
 *
 * Type utility which returns `IF` type when `T` is an _undefined_
 * otherwise returns `ELSE` type.
 * 
 * - if `ELSE` type is _not_ defined that the type of `T` will be 
 * proxied forward
 */
export type IfUndefined<
  T,
  IF,
  ELSE = T
> = IfNever<
  T, 
  never, 
  IsUndefined<T> extends true ? IF : ELSE
>;

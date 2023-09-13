import { IfNever, IsUndefined } from "../..";

/**
 * **IfUndefined**`<T, IF, ELSE>`
 *
 * Type utility which returns `IF` type when `T` is an _undefined_
 * otherwise returns `ELSE` type.
 */
export type IfUndefined<
  T,
  IF,
  ELSE
> = IfNever<T, never, IsUndefined<T> extends true ? IF : ELSE>;

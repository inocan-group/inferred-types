import { Narrowable } from "../literals/Narrowable";
import { IfNever } from "./IfNever";

/**
 * **IsUndefined**
 *
 * Boolean type utility returns `true` if `T` is undefined; `false` otherwise
 */
export type IsUndefined<T> = T extends undefined ? true : false;

/**
 * **IfUndefined**`<T, IF, ELSE>`
 *
 * Type utility which returns `IF` type when `T` is an _undefined_
 * otherwise returns `ELSE` type.
 */
export type IfUndefined<
  T,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IfNever<T, never, IsUndefined<T> extends true ? IF : ELSE>;
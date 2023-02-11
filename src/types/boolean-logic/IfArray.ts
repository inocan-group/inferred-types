import { Narrowable } from "../literals/Narrowable";
import { IsArray } from "./IsArray";

/**
 * **IfArray**`<T, IF, ELSE>`
 *
 * Type utility which convert to type `IF` or `ELSE` based on whether `T` is an array
 */
export type IfArray<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsArray<T> extends true ? IF : ELSE;

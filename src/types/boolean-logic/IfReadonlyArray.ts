import { Narrowable } from "../literals/Narrowable";
import { IsReadonlyArray } from "./IsReadonlyArray";

/**
 * **IfReadonlyArray**`<T, IF, ELSE>`
 *
 * Type utility which convert to type `IF` or `ELSE` based on whether `T` is a readonly array
 */
export type IfReadonlyArray<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsReadonlyArray<T> extends true ? IF : ELSE;

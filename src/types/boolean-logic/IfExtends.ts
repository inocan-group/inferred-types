import { Narrowable } from "../literals/Narrowable";
import { DoesExtend } from "./DoesExtend";

/**
 * **IfExtends**`<TValue,TExtends,IF,ELSE>`
 *
 * Branching type utility which returns type `IF` when `E` _extends_ `T`; otherwise
 * it will return the type `ELSE`.
 */
export type IfExtends<
  TValue extends Narrowable,
  TExtends extends Narrowable,
  IF extends Narrowable = true,
  ELSE extends Narrowable = false
> = DoesExtend<TValue, TExtends> extends true ? IF : ELSE;

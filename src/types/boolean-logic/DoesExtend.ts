import { Narrowable } from "../literals/Narrowable";


/**
 * **DoesExtend**`<TValue, TExtends>`
 *
 * Boolean type utility which returns `true` if `TValue` _extends_ `TExtends`.
 */
export type DoesExtend<
  TValue extends Narrowable, 
  TExtends extends Narrowable
> = TValue extends TExtends
  ? true
  : false;



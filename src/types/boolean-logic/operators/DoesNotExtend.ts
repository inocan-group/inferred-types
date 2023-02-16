import { Narrowable } from "../literals/Narrowable";

/**
 * **DoesNotExtend**`<TValue, TNotExtends>`
 *
 * Boolean type utility which returns `true` if `TValue` _does 
 * not extend_ `TNotExtends`.
 */
export type DoesNotExtend<
TValue extends Narrowable, 
TNotExtends extends Narrowable
> = TValue extends TNotExtends
? false
: true;

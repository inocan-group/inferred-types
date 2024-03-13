import { IfNever } from "../branching/IfNever";

/**
 * **DoesExtend**`<TValue, TExtends>`
 *
 * Boolean type utility which returns `true` if `TValue` _extends_ `TExtends`.
 */
export type DoesExtend<
  TValue, 
  TExtends
> = IfNever<
      TValue, 
      false, 
      TValue extends TExtends
        ? true
        : false
>;


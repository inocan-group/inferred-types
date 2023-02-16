
/**
 * **DoesExtend**`<TValue, TExtends>`
 *
 * Boolean type utility which returns `true` if `TValue` _extends_ `TExtends`.
 */
export type DoesExtend<
  TValue, 
  TExtends
> = TValue extends TExtends
  ? true
  : false;


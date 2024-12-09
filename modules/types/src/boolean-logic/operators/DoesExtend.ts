import { IsNever } from "inferred-types/types";

/**
 * **DoesExtend**`<TValue, TExtends>`
 *
 * Boolean type utility which returns `true` if `TValue` _extends_ `TExtends`.
 */
export type DoesExtend<
  TValue,
  TExtends
> = IsNever<TValue> extends true
  ? false
  : [TValue] extends [TExtends]
    ? true
    : false;


import { DoesExtend } from "src/types/boolean-logic";

/**
 * **IfExtends**`<TValue,TExtends,IF,ELSE>`
 *
 * Branching type utility which returns type `IF` when `E` _extends_ `T`; otherwise
 * it will return the type `ELSE`.
 */
export type IfExtends<
  TValue,
  TExtends,
  IF = TValue & TExtends,
  ELSE = Exclude<TValue, TExtends>
> = DoesExtend<TValue, TExtends> extends true ? IF : ELSE;

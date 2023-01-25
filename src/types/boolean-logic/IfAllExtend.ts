import { Narrowable } from "../literals/Narrowable";
import { AllExtend } from "./AllExtend";

/**
 * **IfAllExtend**`<TList,TExtend,IF,ELSE>`
 * 
 * Branching type util which returns `IF` if **all** of the elements in
 * `TList` extend `TExtend`.
 * 
 * - this is an inverted branching util from `IfExtendsAll`
 * - a closer comparison is `IfSomeExtend` which requires all items to extend
 */
export type IfAllExtend<
  TList extends readonly any[],
  TExtend extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = AllExtend<TList,TExtend> extends true ? IF : ELSE;

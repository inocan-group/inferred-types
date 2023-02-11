import { Narrowable } from "../literals/Narrowable";
import { SomeExtend } from "./SomeExtend";

/**
 * **IfSomeExtend**`<TList,TExtend,IF,ELSE>`
 * 
 * Branching type util which returns `IF` if **some** of the elements in
 * `TList` extend `TExtend`.
 * 
 * - this is an inverted branching util from `IfExtendsSome`
 * - a closer comparison is `IfAllExtend` which requires all items to extend
 */
export type IfSomeExtend<
  TList extends readonly unknown[],
  TExtend extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = SomeExtend<TList,TExtend> extends true ? IF : ELSE;

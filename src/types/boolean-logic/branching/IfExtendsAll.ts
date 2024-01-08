import { Tuple , ExtendsAll } from "../..";

/**
 * **IfExtendsAll**`<TVal,TList,IF,ELSE>`
 * 
 * Type utility which converts the type based on whether `TVal` _extends_
 * all the values in `TList`.
 * 
 * **Related:** `IfExtendsSome`, `IfExtends`
 */
export type IfExtendsAll<
  TVal,TList extends Tuple,
  IF,
  ELSE
> = ExtendsAll<TVal,TList> extends true ? IF : ELSE;

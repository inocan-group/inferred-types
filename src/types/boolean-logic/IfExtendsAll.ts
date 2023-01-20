import { Narrowable } from "../Narrowable";
import { ExtendsAll } from "./ExtendsAll";

/**
 * **IfExtendsAll**`<TVal,TList,IF,ELSE>`
 * 
 * Type utility which converts the type based on whether `TVal` _extends_
 * all the values in `TList`.
 * 
 * **Related:** `IfExtendsSome`, `IfExtends`
 */
export type IfExtendsAll<
  TVal extends Narrowable,
  TList extends readonly any[],
  IF extends Narrowable,
  ELSE extends Narrowable
> = ExtendsAll<TVal,TList> extends true ? IF : ELSE;

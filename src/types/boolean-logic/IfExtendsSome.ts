import { Narrowable } from "../literals/Narrowable";
import { ExtendsSome } from "./ExtendsSome";

/**
 * **IfExtendsSome**`<TList,TValue,IF,ELSE>`
 * 
 * Type utility which converts the type based on whether elements of `TList`
 * extend `TValue`.
 */
export type IfExtendsSome<
TValue,
TList extends readonly unknown[],
IF extends Narrowable,
ELSE extends Narrowable
> = ExtendsSome<TValue,TList> extends true ? IF : ELSE;

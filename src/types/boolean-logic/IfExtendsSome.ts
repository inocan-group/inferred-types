import { Narrowable } from "../literals/Narrowable";

/**
 * **IfExtendsSome**`<TList,TValue,IF,ELSE>`
 * 
 * Type utility which converts the type based on whether elements of `TList`
 * extend `TValue`.
 */
export type IfExtendsSome<
TValue extends Narrowable,
TList extends readonly any[],
IF extends Narrowable,
ELSE extends Narrowable
> = ExtendsSome<TValue,TList> extends true ? IF : ELSE;

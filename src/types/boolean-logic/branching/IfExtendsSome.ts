import { Tuple } from "../base-types";
import { ExtendsSome } from "./ExtendsSome";

/**
 * **IfExtendsSome**`<TList,TValue,IF,ELSE>`
 * 
 * Type utility which converts the type based on whether elements of `TList`
 * extend `TValue`.
 */
export type IfExtendsSome<
TValue,
TList extends Tuple,
IF,
ELSE
> = ExtendsSome<TValue,TList> extends true ? IF : ELSE;

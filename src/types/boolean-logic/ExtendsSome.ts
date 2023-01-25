import { AfterFirst } from "../lists/AfterFirst";
import { First } from "../lists/First";
import { Narrowable } from "../literals/Narrowable";

/**
 * **ExtendsSome**`<TValue,TList>`
 * 
 * Boolean type utility which evaluates whether `TValue` extends **some** of the 
 * elements in `TList`. 
 * 
 * **Related:** `ExtendsAll`, `IfExtendsSome`, `DoesExtend`
 */
export type ExtendsSome<
  TValue extends Narrowable,
  TExtendsSome extends readonly any[]
> = [] extends TExtendsSome
  ? false
  : TValue extends First<TExtendsSome>
    ? true // short circuit with true
    : ExtendsSome<TValue, AfterFirst<TExtendsSome>>;

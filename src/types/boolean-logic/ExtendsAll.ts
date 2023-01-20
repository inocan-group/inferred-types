import { Narrowable } from "../Narrowable";
import { And } from "./And";

type ExtendEveryAcc<
TValue extends Narrowable,
TList extends readonly any[],
Processed extends readonly any[] = []
> = TList extends [infer First, ...infer Rest]
? First extends TValue
  ? ExtendEveryAcc<TValue, Rest, readonly [...Processed, true]>
  : ExtendEveryAcc<TValue, Rest, readonly [...Processed, false]>
: And<Processed>;


/**
* **ExtendsAll**`<TValue, TList>`
* 
* Boolean type utility which evaluates whether `TValue` extends **all** of the 
* elements in `TList`.
* 
* **Related:** `ExtendsSome`, `IfExtendsAll`, `DoesExtend`
*/
export type ExtendsAll<
TValue extends Narrowable,
TList extends readonly any[],
> = ExtendEveryAcc<TValue, TList>;


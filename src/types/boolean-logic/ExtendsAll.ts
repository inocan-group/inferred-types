import { Narrowable } from "../literals/Narrowable";
import { And } from "./combinators/And";

type _Extends<
TValue extends Narrowable,
TList extends readonly unknown[],
Processed extends readonly boolean[] = []
> = TList extends [infer First, ...infer Rest]
? First extends TValue
  ? _Extends<TValue, Rest, readonly [...Processed, true]>
  : _Extends<TValue, Rest, readonly [...Processed, false]>
: And<Processed>;

/**
  * **ExtendsAll**`<TValue, TList>`
  * 
  * Boolean type utility which evaluates whether a singular 
  * value `TValue` extends **all** of the elements in `TList`.
  * 
  * **Related:** `ExtendsSome`, `IfExtendsAll`, `DoesExtend`
  */
export type ExtendsAll<
  TValue extends Narrowable,
  TList extends readonly unknown[],
> = _Extends<TValue, TList>;


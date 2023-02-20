import { And } from "src/types/boolean-logic";


type _Extends<
TValue,
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
  TValue,
  TList extends readonly unknown[],
> = _Extends<TValue, TList>;


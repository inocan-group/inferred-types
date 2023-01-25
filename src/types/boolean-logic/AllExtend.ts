import { AfterFirst, First } from "../lists";
import { Narrowable } from "../literals/Narrowable";
import { IfExtends } from "./IfExtends";

type AllAcc<
  TList extends readonly any[],
  TExtend extends Narrowable
> = [] extends TList
  ? true
  : IfExtends<
      First<TList>, TExtend,
      AllAcc<
        AfterFirst<TList>,
        TExtend
      >,
      false
    >;
  
  
/**
  * **AllExtend**`<TList, TExtend>`
  * 
  * Boolean type util which checks whether **all** of the elements
  * in `TList` _extend_ `TExtend`.
  * 
  * **Related:** `SomeExtend`, `DoesExtend`
  */
export type AllExtend<
  TList extends readonly any[],
  TExtend extends Narrowable
> = AllAcc<TList,TExtend>;

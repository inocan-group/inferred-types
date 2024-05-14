import { AfterFirst, First , If, Extends } from "src/types/index";

type AllAcc<
  TList extends readonly unknown[],
  TExtend
> = [] extends TList
  ? true
  : If<
      Extends<First<TList>, TExtend>,
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
  TList extends readonly unknown[],
  TExtend
> = AllAcc<TList,TExtend>;

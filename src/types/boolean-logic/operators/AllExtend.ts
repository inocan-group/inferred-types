import { AfterFirst, First } from "src/types/lists";
import { IfExtends } from "src/types/boolean-logic";

type AllAcc<
  TList extends readonly unknown[],
  TExtend
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
  TList extends readonly unknown[],
  TExtend
> = AllAcc<TList,TExtend>;

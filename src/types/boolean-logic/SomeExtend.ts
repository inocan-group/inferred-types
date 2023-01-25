import { AfterFirst, First } from "../lists";
import { Narrowable } from "../literals/Narrowable";
import { IfExtends } from "./IfExtends";

type SomeAcc<
  TList extends readonly any[],
  TExtend extends Narrowable
> = [] extends TList
  ? false
  : IfExtends<
      First<TList>, TExtend,
      true,
      SomeAcc<
        AfterFirst<TList>,
        TExtend
      >
    >;

/**
 * **SomeExtend**`<TList, TExtend>`
 * 
 * Boolean type util which checks whether **some** of the elements
 * in `TList` _extend_ `TExtend`.
 */
export type SomeExtend<
  TList extends readonly any[],
  TExtend extends Narrowable
> = SomeAcc<TList,TExtend>;

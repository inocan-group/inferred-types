import { AfterFirst, First } from "src/types/lists";
import { IfExtends } from "src/types/boolean-logic";

type SomeAcc<
  TList extends readonly unknown[],
  TExtend
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
  TList extends readonly unknown[],
  TExtend
> = SomeAcc<TList,TExtend>;

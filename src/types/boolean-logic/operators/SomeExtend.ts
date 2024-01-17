import { AfterFirst, First, IfExtends } from "src/types/index";

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
 * Boolean util which checks whether **some** of the elements
 * in `TList` _extend_ `TExtend`.
 */
export type SomeExtend<
  TList extends readonly unknown[],
  TExtend
> = SomeAcc<TList,TExtend>;

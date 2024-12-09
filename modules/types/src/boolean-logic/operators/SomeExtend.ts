import { AfterFirst, First, If, Extends } from "inferred-types/types";

type SomeAcc<
  TList extends readonly unknown[],
  TExtend
> = [] extends TList
  ? false
  : If<
      Extends<First<TList>, TExtend>,
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

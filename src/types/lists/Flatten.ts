import {  IfArray } from "../boolean-logic";
import { IfSomeExtend } from "../boolean-logic/IfSomeExtend";
import { AfterFirst } from "./AfterFirst";
import { First } from "./First";

type FlattenAcc<
  TList extends readonly any[],
  TResults extends readonly any[] = []
> = [] extends TList
  ? TResults
  : FlattenAcc<
      AfterFirst<TList>, 
      IfArray<
        First<TList>,
        IfSomeExtend<
          First<TList>, any[] | readonly any[], 
          readonly [ ...TResults, ...FlattenAcc<First<TList>> ],
          readonly [ ...TResults, ...First<TList> ]
        >,
        readonly [ ...TResults, First<TList> ]
      >
    >;

export type Flatten<
  T extends readonly any[]
> = Readonly<FlattenAcc<T>>;

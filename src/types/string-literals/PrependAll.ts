import { AfterFirst, First } from "../lists";
import { ToString } from "src/types";

type PrependAcc<
  TList extends readonly string[],
  TPrepend extends string,
  TResults extends string[] = []
> = [] extends TList
  ? TResults
  : PrependAcc<
      AfterFirst<TList>,
      TPrepend,
      [...TResults, `${TPrepend}${First<TList>}`]
    >;

export type PrependAll<
  TList extends readonly string[],
  TPrepend extends string | number | boolean
> = PrependAcc<TList, ToString<TPrepend>>;

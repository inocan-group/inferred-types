import { AfterFirst } from "./AfterFirst";
import { First } from "./First";

type RevAcc<
  TInput extends readonly any[],
  TResults extends readonly any[] = []
> = [] extends TInput
  ? TResults
  : RevAcc<
      AfterFirst<TInput>,
      readonly [ First<TInput>, ...TResults ]
    >;

export type Reverse<T extends readonly any[]> = RevAcc<T>;


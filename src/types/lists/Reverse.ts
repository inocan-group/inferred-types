import { AfterFirst , First } from "src/types/index";

type RevAcc<
  TInput extends readonly unknown[],
  TResults extends readonly unknown[] = []
> = [] extends TInput
  ? TResults
  : RevAcc<
      AfterFirst<TInput>,
      [ First<TInput>, ...TResults ]
    >;

export type Reverse<T extends readonly unknown[]> = RevAcc<T>;


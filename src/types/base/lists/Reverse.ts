import { AfterFirst , First } from "..";

type RevAcc<
  TInput extends readonly unknown[],
  TResults extends readonly unknown[] = []
> = [] extends TInput
  ? TResults
  : RevAcc<
      AfterFirst<TInput>,
      readonly [ First<TInput>, ...TResults ]
    >;

export type Reverse<T extends readonly unknown[]> = RevAcc<T>;


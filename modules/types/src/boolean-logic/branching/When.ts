import type { ComparatorOperation, Compare } from "../combinators";

export type When<
    TVal,
    TComparator,
    TThen extends never,
    TOp extends ComparatorOperation = "extends",
> = Compare<TVal, TOp, TComparator> extends true
    ? TThen
    : TVal;

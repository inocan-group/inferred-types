import type { Compare, ComparisonLookup, ComparisonOperation } from "inferred-types/types";

export type When<
    TVal,
    TComparator extends ComparisonLookup[TOp]["params"],
    TThen extends never,
    TOp extends ComparisonOperation = "extends",
> = Compare<TVal, TOp, TComparator> extends true
    ? TThen
    : TVal;

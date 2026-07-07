import type { Compare, ComparisonAccept, ComparisonOperation, GetComparisonParams } from "inferred-types/types";

export type When<
    TVal extends ComparisonAccept<TOp>,
    TComparator extends GetComparisonParams<TOp>,
    TThen extends never,
    TOp extends ComparisonOperation = "extends",
> = Compare<TVal, TOp, TComparator> extends true
    ? TThen
    : TVal;

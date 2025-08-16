import type { ComparisonAccept, ComparisonOperation, Filter, GetComparisonParams } from "inferred-types/types";

/**
 * **FilterFn**`<TOp, TParams>`
 *
 * A type realized when partially applying the runtime's `filter()`
 * utility. This partially-applied type can be reused as a comparator
 * function which
 */
export type FilterFn<
    TOp extends ComparisonOperation,
    TParams extends GetComparisonParams<TOp>
> = <const TList extends readonly ComparisonAccept<TOp>[]>(list: TList) => Filter<
    TList,
    TOp,
    TParams
>;

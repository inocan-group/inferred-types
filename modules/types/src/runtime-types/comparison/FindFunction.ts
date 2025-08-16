import type { ComparisonAccept, ComparisonOperation, Find, GetComparisonParams } from "inferred-types/types";

/**
 * **FindFunction**`<TOp, TParams>`
 *
 * A partially applied type resulting from a call to the
 * runtime's `find()` utility. This function has a fully
 * configured `Comparator` (aka, an comparison _operation_
 * and one or more parameters to allow valid comparisons
 * to be made).
 */
export type FindFunction<
    TOp extends ComparisonOperation,
    TParams extends GetComparisonParams<TOp>
> = <const TList extends readonly ComparisonAccept<TOp>[]>(
    list: TList
) => Find<
    TList,
    TOp,
    TParams
>;

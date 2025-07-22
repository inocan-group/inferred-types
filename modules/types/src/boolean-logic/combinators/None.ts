import type { ComparisonOperation, Container, Every, GetComparisonParamInput, Not } from "inferred-types/types";

/**
 * **None**`<TContainer, TOp, TComparator>`
 *
 * Evaluates a container (_a tuple or kv object_) to see if **none** of
 * the _values_ `TContainer` contains match the comparison provided by the `TOp` and
 * `TComparator`.
 *
 * - this is the opposite of the `Every` utility
 *
 * ```ts
 * // true
 * type T = Every<["foo","bar","baz"], "extends", [string]>;
 * // false
 * type F = Every<["foo","bar","baz", 42], "extends", [string]>;
 * ```
 */
export type None<
    TContainer extends Container,
    TOp extends ComparisonOperation,
    TComparator extends GetComparisonParamInput<TOp>,
> = Not<Every<TContainer, TOp, TComparator>>;

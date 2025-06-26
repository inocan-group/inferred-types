import { DefaultNesting, NestedSplitPolicy, Nesting } from "inferred-types/types";

/**
 * **nestedSplit**`(content, split, [nesting], [policy])`
 *
 * A run-time utility to split string's in a nested-aware manner.
 *
 * **Related:** `NestedSplit<..>`, `split()`, `nested()`
 */
export function nestedSplit<
    TContent extends string,
    TSplit extends string,
    TNesting extends Nesting = DefaultNesting,
    TPolicy extends NestedSplitPolicy = "omit"
>() {

}

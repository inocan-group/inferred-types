import type {
    AfterFirst,
    Compare,
    ComparisonAccept,
    ComparisonOperation,
    Container,
    First,
    GetComparisonParamInput,
    IsWideContainer,
    Values
} from "inferred-types/types";

type Process<
    TElements,
    TOp extends ComparisonOperation,
    TComparator extends GetComparisonParamInput<TOp>,
> = [] extends TElements
    ? true
    : TElements extends readonly unknown[]
        ? First<TElements> extends ComparisonAccept<TOp>
            ? [Compare<First<TElements>, TOp, TComparator>] extends [true]
                ? Process<
                    AfterFirst<TElements>,
                    TOp,
                    TComparator
                >
                : false
            : Process<
                AfterFirst<TElements>,
                TOp,
                TComparator
            >
        : false;

/**
 * **Every**`<TContainer, TOp, TComparator>`
 *
 * Evaluates a container (_a tuple or kv object_) to see if **every** one of
 * the _values_ it contains match the comparison provided by the `TOp` and
 * `TComparator`.
 *
 * ```ts
 * // true
 * type T = Every<["foo","bar","baz"], "extends", [string]>;
 * // false
 * type F = Every<["foo","bar","baz", 42], "extends", [string]>;
 * ```
 */
export type Every<
    TContainer extends Container,
    TOp extends ComparisonOperation,
    TComparator extends GetComparisonParamInput<TOp> | First<GetComparisonParamInput<TOp>>,
> = IsWideContainer<TContainer> extends true
    ? boolean
    : Process<
        Values<TContainer>,
        TOp,
        TComparator extends GetComparisonParamInput<TOp>
            ? TComparator
            : TComparator extends First<GetComparisonParamInput<TOp>>
                ? [TComparator] extends GetComparisonParamInput<TOp>
                    ? [TComparator]
                    : never
                : never
    >;

import type {
    Compare,
    ComparisonAccept,
    ComparisonOperation,
    Container,
    First,
    GetComparisonParams,
    IsWideContainer,
    Values
} from "inferred-types/types";

type Process<
    TElements extends readonly unknown[],
    TOp extends ComparisonOperation,
    TComparator extends GetComparisonParams<TOp>,
> = TElements extends [infer Head, ...infer Rest]
? TElements extends readonly unknown[]
    ? Head extends ComparisonAccept<TOp>
        ? [Compare<Head, TOp, TComparator>] extends [true]
            ? Process<
                Rest,
                TOp,
                TComparator
            >
            : false
        : Process<
            Rest,
            TOp,
            TComparator
        >
    : false
: true;

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
    TComparator extends GetComparisonParams<TOp> | First<GetComparisonParams<TOp>>,
> = IsWideContainer<TContainer> extends true
    ? boolean
    : Process<
        Values<TContainer>,
        TOp,
        TComparator extends GetComparisonParams<TOp>
            ? TComparator
            : TComparator extends First<GetComparisonParams<TOp>>
                ? [TComparator] extends GetComparisonParams<TOp>
                    ? [TComparator]
                    : never
                : never
    >;

import type {
    AfterFirst,
    AsArray,
    Compare,
    ComparisonAccept,
    ComparisonOperation,
    Container,
    Dictionary,
    Err,
    First,
    GetComparisonParamInput,
    IsObjectLiteral,
    IsWideContainer,
    Values
} from "inferred-types/types";

type Process<
    TElements extends readonly unknown[],
    TOp extends ComparisonOperation,
    TComparator extends GetComparisonParamInput<TOp>,
> = [] extends TElements
    ? true
    : First<TElements> extends ComparisonAccept<TOp>
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
        >;

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
> = AsArray<TComparator> extends GetComparisonParamInput<TOp>
    ? TContainer extends readonly unknown[]
        ? IsWideContainer<TContainer> extends true
            ? boolean
            : Process<TContainer, TOp, AsArray<TComparator>>
        : TContainer extends Dictionary
            ? IsObjectLiteral<TContainer> extends true
                ? Process<Values<TContainer>, TOp, AsArray<TComparator>>
                : boolean
            : never
    : Err<
        `invalid-type/comparator`,
    `the Every<TContainer,TOp,TComparator> utility requires that the comparator be an array of values which meet the criteria for the specified operation. In many cases, operations only require a single parameter so for convenience we allow a non-array syntax when calling Some which we then convert to a single element tuple. In both cases, we compare the resultant comparator tuple to the requirements and in this case the comparator does not meet the minimum requirements for the operation '${TOp}'.`,
    {
        comparator: AsArray<TComparator>;
        asReceived: TComparator;
        op: TOp;
        requirement: GetComparisonParamInput<TOp>;
    }
    >;

import type {
    AfterFirst,
    Compare,
    ComparisonOperation,
    Container,
    Dictionary,
    First,
    Values,
    GetComparisonParamInput,
    ComparisonAccept,
    AsArray,
    Err,
    IsWideContainer
} from "inferred-types/types";

type Process<
    TElements extends readonly unknown[],
    TOp extends ComparisonOperation,
    TComparator extends GetComparisonParamInput<TOp>,
> = [] extends TElements
    ? false
    : First<TElements> extends ComparisonAccept<TOp>
        ? [Compare<First<TElements>, TOp, TComparator>] extends [true]
            ? true
            : Process<
                AfterFirst<TElements>,
                TOp,
                TComparator
            >
    : Process<
        AfterFirst<TElements>,
        TOp,
        TComparator
    >;


/**
 * **Some**`<TContainer, TOp, TComparator>`
 *
 * Evaluates a container (_a tuple or kv object_) to see if **some** of the _values_ it contains
 * match the comparison provided by the `TOp` and `TComparator`.
 *
 * ```ts
 * // true
 * type Test = Some<["foo","bar","baz"], "equals", ["foo"]>;
 * ```
 */
export type Some<
    TContainer extends Container,
    TOp extends "extends" | "equals" | "startsWith" | "endsWith" | "lessThan" | "greaterThan",
    TComparator extends GetComparisonParamInput<TOp> | First<GetComparisonParamInput<TOp>>,
> = IsWideContainer<TContainer> extends true
? boolean

: AsArray<TComparator> extends GetComparisonParamInput<TOp>
? TContainer extends readonly unknown[]
    ? Process<TContainer, TOp, AsArray<TComparator>>
: TContainer extends Dictionary
    ? Process<Values<TContainer>, TOp, AsArray<TComparator>>
    : never
: Err<
    `invalid-type/comparator`,
    `the Some<TContainer,TOp,TComparator> utility requires that the comparator be an array of values which meet the criteria for the specified operation. In many cases, operations only require a single parameter so for convenience we allow a non-array syntax when calling Some which we then convert to a single element tuple. In both cases, we compare the resultant comparator tuple to the requirements and in this case the comparator does not meet the minimum requirements for the operation '${TOp}'.`,
    {
        comparator: AsArray<TComparator>,
        asReceived: TComparator,
        op: TOp,
        requirement: GetComparisonParamInput<TOp>
    }
>;

import type {
    AsArray,
    Compare,
    ComparisonAccept,
    ComparisonOperation,
    Container,
    Err,
    GetComparisonParamInput,
    IsDictionary,
    IsLiteralLikeArray,
    IsLiteralLikeObject,
    Or,
    Values
} from "inferred-types/types";

type Process<
    T extends readonly unknown[],
    TOp extends ComparisonOperation,
    TComparator extends readonly unknown[],
> = [] extends TComparator
? false
:

Or<{
    [K in keyof T]: T[K] extends ComparisonAccept<TOp>
        ? Compare<T[K], TOp,  TComparator>
        : false
}>;

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
    TOp extends ComparisonOperation,
    TComparator extends readonly unknown[],
> = AsArray<TComparator> extends GetComparisonParamInput<TOp>
    ? [TContainer] extends [readonly unknown[]]
        ? [IsLiteralLikeArray<TContainer>] extends [true]
            ? Process<TContainer, TOp, AsArray<TComparator>>
            : boolean
        : IsDictionary<TContainer> extends true
            ? IsLiteralLikeObject<TContainer> extends true
                ? Process<Values<TContainer>, TOp, AsArray<TComparator>>
                : boolean
            : never
    : Err<
        `invalid-type/comparator`,
    `the Some<TContainer,TOp,TComparator> utility requires that the comparator be an array of values which meet the criteria for the specified operation. In many cases, operations only require a single parameter so for convenience we allow a non-array syntax when calling Some which we then convert to a single element tuple. In both cases, we compare the resultant comparator tuple to the requirements and in this case the comparator does not meet the minimum requirements for the operation '${TOp}'.`,
    {
        comparator: AsArray<TComparator>;
        asReceived: TComparator;
        op: TOp;
        requirement: GetComparisonParamInput<TOp>;
    }
    >;





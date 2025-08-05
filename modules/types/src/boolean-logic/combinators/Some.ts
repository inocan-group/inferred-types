import type {
    AfterFirst,
    Compare,
    ComparisonAccept,
    ComparisonOperation,
    Container,
    GetComparisonParamInput,
    IsTrue,
    IsWideContainer,
    Values
} from "inferred-types/types";

type Process<
    T,
    TOp extends ComparisonOperation,
    TComparator extends GetComparisonParamInput<TOp>,
    THasBool extends boolean = false
> = [] extends TComparator
? IsTrue<THasBool> extends true
    ? boolean
    : false
: T extends readonly unknown[]
    ? T extends readonly [infer First, ...infer Rest]
        ? First extends ComparisonAccept<TOp>
            ? [Compare<First, TOp, TComparator>] extends [false]
                ? Process<
                    Rest,
                    TOp,
                    TComparator,
                    THasBool
                >
                : [Compare<First, TOp, TComparator>] extends [true]
                    ? true
                : [Compare<First, TOp, TComparator>] extends [boolean]
                    ? Process<
                        Rest,
                        TOp,
                        TComparator,
                        true
                    >
            : Process<
                AfterFirst<T>,
                TOp,
                TComparator,
                THasBool
            >
        : false
    : false
: false;


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
    TComparator extends GetComparisonParamInput<TOp> | GetComparisonParamInput<TOp>[0],
> = IsWideContainer<TContainer> extends true
    ? boolean
: Process<
    Values<TContainer>,
    TOp,
    TComparator extends GetComparisonParamInput<TOp>
        ? TComparator
        : TComparator extends GetComparisonParamInput<TOp>[0]
            ? [TComparator] extends GetComparisonParamInput<TOp>
                ? [TComparator]
                : never
            : never
>






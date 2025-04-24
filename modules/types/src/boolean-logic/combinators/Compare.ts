import type {
    And,
    As,
    AsArray,
    ComparisonLookup,
    ComparisonOp,
    ComparisonOperation,
    Contains,
    DoesExtend,
    EndsWith,
    Err,
    Extends,
    First,
    IsEqual,
    IsGreaterThan,
    IsGreaterThanOrEqual,
    IsLessThan,
    IsLessThanOrEqual,
    IsUnion,
    MaxLength,
    MinLength,
    NumberLike,
    SomeEqual,
    StartsWith,
    Tuple,
    TypedFunction,
} from "inferred-types/types";



/**
 * **ParamsForComparison**`<T>`
 *
 * Provides a lookup function on `T` of the _parameters_ required
 * for a given `ComparatorOperation`.
 */
// export type ParamsForComparison<
//     T extends ComparisonOperation<"design-time">,
// > =
//     T extends "equals"
//     ? readonly [unknown]
//     : T extends "extends"
//     ? readonly [unknown]
//     : T extends "startsWith"
//     ? [string | number]
//     : T extends "endsWith"
//     ? readonly [string | number]
//     : T extends "contains"
//     ? readonly [unknown, ...Tuple[]]
//     : T extends "containsAll"
//     ? readonly [unknown, ...Tuple[]]
//     : T extends "greaterThan"
//     ? readonly [NumberLike]
//     : T extends "greaterThanOrEqual"
//     ? readonly [NumberLike]
//     : T extends "lessThan"
//     ? readonly [NumberLike]
//     : T extends "lessThanOrEqual"
//     ? readonly [NumberLike]
//     : never;

/**
 * **Comparison**`<TOp,TArgs>`
 *
 * A strongly typed comparison which can be used in runtime utilities
 * like `filter`, `retain`, and `map`.
 *
 * - typically generated with the `createComparison(op,...params)` runtime utility.
 *
 * ```ts
 * // Comparison<"equals",[true]>
 * const isTrue = createComparison("equals", true);
 * //
 * const filtered = filter(isTrue)(listOfStuff);
 * ```
 */
export type Comparison<
    TOp extends ComparisonOperation = ComparisonOperation,
    TParams extends readonly unknown[] = IsUnion<TOp> extends true
    ? readonly unknown[]
    : ComparisonLookup<"design-time">[TOp]["params"],
    TFn extends TypedFunction = TypedFunction,
> = {
    kind: "Comparison";
    op: TOp;
    args: TParams;
    fn: TFn;
};



type Process<
    TVal,
    TOp extends ComparisonOperation,
    TComparator extends AsArray<TParams>,
    TParams = ComparisonLookup<"design-time">[TOp]["params"]
> = TOp extends "extends"
    ? DoesExtend<TVal, TComparator[number]>

    : TOp extends "equals"
    ? SomeEqual<TComparator, TVal>

    : TOp extends "equalsSome"
    ? SomeEqual<TComparator, TVal>


    : TOp extends "containsSome"
    ? [TVal] extends [string | number | Tuple]
    ? Contains<TVal, TComparator>
    : false

    : TOp extends "containsAll"
    ? [TVal] extends [Tuple]
        ? [TComparator] extends [string | number | readonly string[]]
        ? Contains<TVal, TComparator>
        : false
    : never

    : TOp extends "startsWith"
        ? And<[
            Extends<TComparator[number], string | number>,
            Extends<TVal, string | number>
        ]> extends true
            ? StartsWith<
                As<TVal, string | number>,
                As<TComparator[number], string | number>
            >
            : false

    : TOp extends "greaterThan"
    ? And<[
        Extends<First<TComparator>, NumberLike>,
        Extends<TVal, NumberLike>
    ]> extends true
        ? IsGreaterThan<
            As<TVal, NumberLike>,
            As<First<TComparator>, NumberLike>
        >
        : false

    : TOp extends "greaterThanOrEqual"
        ? And<[
            Extends<First<TComparator>, NumberLike>,
            Extends<TVal, NumberLike>
        ]> extends true
            ? IsGreaterThanOrEqual<
                As<TVal, NumberLike>,
                As<First<TComparator>, NumberLike>
            >
            : false

    : TOp extends "lessThan"
    ? And<[
        Extends<First<TComparator>, NumberLike>,
        Extends<TVal, NumberLike>
    ]> extends true
    ? IsLessThan<
        As<TVal, NumberLike>,
        As<First<TComparator>, NumberLike>
    >
    : false

    : TOp extends "lessThanOrEqual"
    ? And<[
        Extends<First<TComparator>, NumberLike>,
        Extends<TVal, NumberLike>
    ]> extends true
    ? IsLessThanOrEqual<
        As<TVal, NumberLike>,
        As<First<TComparator>, NumberLike>
    >
    : false

    : TOp extends "endsWith"
        ? And<[
            Extends<TComparator[number], string | number>,
            Extends<TVal, string | number>
        ]> extends true
            ? EndsWith<
                As<TVal, string| number>,
                As<TComparator[number], string | number>
            >
            : false

    : TOp extends "returnEquals"
    ? TVal extends ((...args: any[]) => any) ? IsEqual<ReturnType<TVal>, TComparator> : false

    : TOp extends "returnExtends"
    ? TVal extends ((...args: any[]) => any) ? IsEqual<ReturnType<TVal>, TComparator> : false

    : never;

type ComparatorParams<
    T extends ComparisonOperation,
    TOp extends ComparisonOp<'design-time'> = ComparisonLookup[T]
> = MinLength<TOp["params"]> extends 1
? First<TOp["params"]> | TOp["params"]
    : MinLength<TOp["params"]> extends 0
        ? MaxLength<TOp["params"]> extends 0
            ? []
            : First<TOp["params"]> | TOp["params"]
    : TOp["params"];



/**
 * **Compare**`<TVal,TOp,TComparator>`
 *
 * Compares the value `TVal` with `TComparator` using
 * the `TOp` _operator_.
 */
export type Compare<
    TVal,
    TOp extends ComparisonOperation,
    TComparator extends ComparatorParams<TOp>
> = AsArray<TComparator> extends AsArray<
    ComparisonLookup<"design-time">[TOp]["params"]
>
    ? Process<
        TVal,
        TOp,
        AsArray<TComparator>
    >
    : never;



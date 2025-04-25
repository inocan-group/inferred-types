import type {
    And,
    As,
    AsArray,
    AsString,
    ComparisonLookup,
    ComparisonOperation,
    Contains,
    DateLike,
    DoesExtend,
    EndsWith,
    Err,
    Extends,
    First,
    Flexy,
    Integer,
    IsBetweenExclusively,
    IsBetweenInclusively,
    IsEqual,
    IsFalse,
    IsFalsy,
    IsGreaterThan,
    IsGreaterThanOrEqual,
    IsInteger,
    IsIso8601DateTime,
    IsIsoDate,
    IsLessThan,
    IsLessThanOrEqual,
    IsTrue,
    IsTruthy,
    IsUnion,
    Join,
    NumberLike,
    Or,
    Second,
    SomeEqual,
    StartsWith,
    Tuple,
    TypedFunction
} from "inferred-types/types";

/**
 * **Comparator**
 *
 * A _comparator_ is a tuple that consists of a `ComparisonOperation`
 * in the 0-index position, and any parameters which that comparison
 * operation requires to make the comparison.
 */
export type Comparator<
    T extends ComparisonOperation = ComparisonOperation,
    P extends ComparisonLookup[T]["params"] = ComparisonLookup[T]["params"]
> = [
    op: T,
    ...P
]

/**
 * Get's the parameters from a `Comparator` or a `ComparisonOperation`
 */
type Params<
    T extends Comparator<ComparisonOperation> | ComparisonOperation
> = T extends readonly [ComparisonOperation, ...infer Rest]
? Rest
: T extends ComparisonOperation
    ? ComparisonLookup[T]["params"]
    : never;

/**
 * Get's the `ComparisonOperation` from a `Comparator`.
 */
type Op<T extends Comparator<ComparisonOperation>> = T[0];



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
    TComparator extends Comparator,
    TOp extends ComparisonOperation = Op<TComparator>,
    TParams extends ComparisonLookup[TOp]["params"] = Params<TComparator>
> = TOp extends "after"
    ? And<[
        Extends<TVal, DateLike>,
        Extends<First<TParams>, DateLike>
    ]> extends true
        ? And<[
            IsInteger<TVal>,
            IsInteger<First<TParams>>
        ]> extends true
            ? IsGreaterThan<As<TVal, Integer>, As<First<TParams>, Integer>>
            : boolean
        : false
: TOp extends "before"
? And<[
    Extends<TVal, DateLike>,
    Extends<First<TParams>, DateLike>
]> extends true
    ? And<[
        IsInteger<TVal>,
        IsInteger<First<TParams>>
    ]> extends true
        ? IsLessThan<As<TVal, Integer>, As<First<TParams>, Integer>>
        : boolean
    : false

: TOp extends "sameDay"
    ? And<[
        Extends<TVal, DateLike>,
        Extends<First<TParams>, DateLike>
    ]> extends true
        ? And<[
            Or<[IsIsoDate<TVal>, IsIso8601DateTime<TVal>]>,
            Or<[IsIsoDate<First<TParams>>, IsIso8601DateTime<TVal>]>
        ]> extends true
        ? IsEqual<
            TVal extends `${infer Year extends number}-${infer Month extends number}-${infer Date extends number}${string}`
                ? `${Year}-${Month}-${Date}`
                : "invalid-value",
            First<TParams> extends `${infer Year extends number}-${infer Month extends number}-${infer Date extends number}${string}`
                ? `${Year}-${Month}-${Date}`
                : "invalid-value"
        >
        : boolean
    : false
: TOp extends "sameMonthYear"
    ? And<[
        Extends<TVal, DateLike>,
        Extends<First<TParams>, DateLike>
    ]> extends true
        ? And<[
            Or<[IsIsoDate<TVal>, IsIso8601DateTime<TVal>]>,
            Or<[IsIsoDate<First<TParams>>, IsIso8601DateTime<TVal>]>
        ]> extends true
        ? IsEqual<
            TVal extends `${infer Year extends number}-${infer Month extends number}-${infer _Date extends number}${string}`
                ? `${Year}-${Month}`
                : "invalid-value",
            First<TParams> extends `${infer Year extends number}-${infer Month extends number}-${infer _Date extends number}${string}`
                ? `${Year}-${Month}`
                : "invalid-value"
        >
        : boolean
    : false
: TOp extends "sameMonth"
    ? And<[
        Extends<TVal, DateLike>,
        Extends<First<TParams>, DateLike>
    ]> extends true
        ? And<[
            Or<[IsIsoDate<TVal>, IsIso8601DateTime<TVal>]>,
            Or<[IsIsoDate<First<TParams>>, IsIso8601DateTime<TVal>]>
        ]> extends true
        ? IsEqual<
            TVal extends `${infer _Year extends number}-${infer Month extends number}-${infer _Date extends number}${string}`
                ? Month
                : "invalid-value",
            First<TParams> extends `${infer _Year extends number}-${infer Month extends number}-${infer _Date extends number}${string}`
                ? Month
                : "invalid-value"
        >
        : boolean
    : false

: TOp extends "sameYear"
    ? And<[
        Extends<TVal, DateLike>,
        Extends<First<TParams>, DateLike>
    ]> extends true
        ? And<[
            Or<[IsIsoDate<TVal>, IsIso8601DateTime<TVal>]>,
            Or<[IsIsoDate<First<TParams>>, IsIso8601DateTime<TVal>]>
        ]> extends true
        ? IsEqual<
            TVal extends `${infer Year extends number}-${infer _Month extends number}-${infer _Date extends number}${string}`
                ? Year
                : "invalid-value",
            First<TParams> extends `${infer Year extends number}-${infer _Month extends number}-${infer _Date extends number}${string}`
                ? Year
                : "invalid-value"
        >
        : boolean
    : false


: TOp extends "extends"
    ? DoesExtend<TVal, TParams[number]>

    : TOp extends "equals"
    ? SomeEqual<TComparator, TVal>

    : TOp extends "equalsSome"
    ? SomeEqual<TComparator, TVal>


    : TOp extends "contains"
    ? [TVal] extends [string | number | Tuple]
        ? TVal extends Tuple
            ? Contains<TVal, TParams[number]>
            : Contains<TVal, AsString<TParams[number]>>
        : false

    : TOp extends "containsAll"
    ? [TVal] extends [string | number | Tuple]
        ? [TComparator] extends [string | number | readonly string[]]
            ? Contains<TVal, TParams>
            : false
        : false

    : TOp extends "startsWith"
        ? And<[
            Extends<TParams[number], string | number>,
            Extends<TVal, string | number>
        ]> extends true
            ? StartsWith<
                As<TVal, string | number>,
                As<TParams[number], string | number>
            >
            : false

    : TOp extends "false"
        ? IsFalse<TVal>

    : TOp extends "falsy"
        ? IsFalsy<TVal>

    : TOp extends "greaterThan"
        ? And<[
            Extends<First<TParams>, NumberLike>,
            Extends<TVal, NumberLike>
        ]> extends true
            ? IsGreaterThan<
                As<TVal, NumberLike>,
                As<First<TParams>, NumberLike>
            >
            : false

    : TOp extends "greaterThanOrEqual"
        ? And<[
            Extends<First<TParams>, NumberLike>,
            Extends<TVal, NumberLike>
        ]> extends true
            ? IsGreaterThanOrEqual<
                As<TVal, NumberLike>,
                As<First<TParams>, NumberLike>
            >
            : false

    : TOp extends "lessThan"
        ? And<[
            Extends<First<TParams>, NumberLike>,
            Extends<TVal, NumberLike>
        ]> extends true
            ? IsLessThan<
                As<TVal, NumberLike>,
                As<First<TParams>, NumberLike>
            >
            : false

    : TOp extends "lessThanOrEqual"
        ? And<[
            Extends<First<TParams>, NumberLike>,
            Extends<TVal, NumberLike>
        ]> extends true
            ? IsLessThanOrEqual<
                As<TVal, NumberLike>,
                As<First<TParams>, NumberLike>
            >
            : false

    : TOp extends "betweenExclusively"
        ? TVal extends NumberLike
            ? First<TParams> extends NumberLike
                ? Second<TParams> extends NumberLike
                    ? IsBetweenExclusively<TVal,First<TParams>,Second<TParams> >
                    : false
                : false
            : false

    : TOp extends "betweenInclusively"
        ? TVal extends NumberLike
            ? First<TParams> extends NumberLike
                ? Second<TParams> extends NumberLike
                    ? IsBetweenInclusively<TVal,First<TParams>,Second<TParams> >
                    : false
                : false
            : false


    : TOp extends "objectKeyValueGreaterThan"
        ? And<[
            Extends<Second<TParams>, NumberLike>,
            Extends<TVal, object>
        ]> extends true
            ? First<TParams> extends keyof TVal
                ? IsGreaterThan<
                    As<TVal[First<TParams>], NumberLike>,
                    As<Second<TParams>, NumberLike>
                >
            : false
        : false


    : TOp extends "objectKeyValueGreaterThanOrEqual"
        ? And<[
            Extends<Second<TParams>, NumberLike>,
            Extends<TVal, object>
        ]> extends true
            ? First<TParams> extends keyof TVal
                ? IsGreaterThanOrEqual<
                    As<TVal[First<TParams>], NumberLike>,
                    As<Second<TParams>, NumberLike>
                >
                : false
            : false


    : TOp extends "objectKeyValueLessThan"
        ? And<[
            Extends<Second<TParams>, NumberLike>,
            Extends<TVal, object>
        ]> extends true
            ? First<TParams> extends keyof TVal
                ? IsLessThan<
                    As<TVal[First<TParams>], NumberLike>,
                    As<Second<TParams>, NumberLike>
                >
                : false
            : false


    : TOp extends "objectKeyValueLessThanOrEqual"
        ? And<[
            Extends<Second<TParams>, NumberLike>,
            Extends<TVal, object>
        ]> extends true
            ? First<TParams> extends keyof TVal
                ? IsLessThanOrEqual<
                    As<TVal[First<TParams>], NumberLike>,
                    As<Second<TParams>, NumberLike>
                >
                : false
            : false


    : TOp extends "errors"
        ? TVal extends Error
            ? true
            : false

    : TOp extends "errorsOfType"
        ? TVal extends Error
            ? "type" extends keyof TVal
                ? First<TParams> extends TVal["type"]
                    ? true
                    : false
                : false
            : false


    : TOp extends "endsWith"
        ? And<[
            Extends<TParams[number], string | number>,
            Extends<TVal, string | number>
        ]> extends true
            ? EndsWith<
                As<TVal, string| number>,
                As<TParams[number], string | number>
            >
            : false

    : TOp extends "returnEquals"
        ? TVal extends ((...args: any[]) => any)
            ? IsEqual<ReturnType<TVal>, TParams>
            : false

    : TOp extends "returnExtends"
        ? TVal extends ((...args: any[]) => any)
            ? IsEqual<ReturnType<TVal>, TParams>
            : false

    : TOp extends "true"
        ? IsTrue<TVal>

    : TOp extends "truthy"
        ? IsTruthy<TVal>

    : TOp extends "objectKeyEquals"
        ? TVal extends object
            ? First<TParams> extends keyof TVal
                ? IsEqual<
                    TVal[First<TParams>],
                    Second<TParams>>
                : false
            : false

    : TOp extends "objectKeyExtends"
        ? TVal extends object
            ? First<TParams> extends keyof TVal
                ? Extends<
                    TVal[First<TParams>],
                    Second<TParams>
                >
                : false
            : false

    : Err<
        `invalid-operation/compare`,
        `The operation '${TOp}' is not a recognized operation in the Compare<...> type utility!`
    >;


/**
 * **Compare**`<TVal,TOp,TComparator>`
 *
 * Compares the value `TVal` with `TComparator` using
 * the `TOp` _operator_.
 */
export type Compare<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends Flexy<ComparisonLookup[TOp]["params"]>,
    THandle extends "error" | "never" = "error"
> = [ TOp, ...AsArray<TParams> ] extends Comparator<TOp>
    ? Process<
        TVal,
        As<[ TOp, ...AsArray<TParams> ], Comparator>
    >
    : THandle extends "error"
        ? Err<
            `invalid-comparator`,
            `The Compare<${AsString<TVal>}, ${TOp}, [ ${Join<AsArray<TParams>, ", "> } ]> utility was called with invalid parameters! Expected: [ ${Join<ComparisonLookup[TOp]["params"], ", ">} ]`,
            {
                params: Join<AsArray<TParams>, ", ">,
                op: TOp,
                expected: Join<ComparisonLookup[TOp]["params"], ", ">
            }
        >
        : never;


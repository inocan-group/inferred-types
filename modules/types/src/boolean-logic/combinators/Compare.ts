import type {
    AlphaChar,
    AlphaNumericChar,
    And,
    As,
    ComparisonInputDefault,
    ComparisonInputToTuple,
    ComparisonLookup,
    ComparisonOpConfig,
    ComparisonOperation,
    Contains,
    ContainsAll,
    DateLike,
    DoesExtend,
    EndsWith,
    Equals,
    Err,
    Extends,
    First,
    FirstChar,
    GetComparator,
    GetComparisonParamInput,
    GetOpConfig,
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
    IsLiteral,
    IsNumberLike,
    IsObject,
    IsObjectLiteral,
    IsString,
    IsStringLiteral,
    IsTrue,
    IsTruthy,
    LastChar,
    NumberLike,
    NumericChar,
    Or,
    RetainChars,
    Second,
    SomeEqual,
    StartsWith,
    Tuple,
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
];


type Process<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup<"design-time">[TOp]["params"],

    TConfig extends ComparisonOpConfig = GetOpConfig<TOp>,
    TComparator extends GetComparator<TConfig, TParams> = GetComparator<TConfig, TParams>
> = TOp extends "after"
    ? And<[
        Extends<TVal, DateLike>,
        Extends<First<TParams>, DateLike>
    ]> extends true
        ? And<[
            IsInteger<TVal>,
            IsInteger<First<TParams>>
        ]> extends true
            ? IsGreaterThan<As<TVal, NumberLike>, As<First<TParams>, NumberLike>>
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
        ? IsLessThan<As<TVal, Integer>, As<TComparator, Integer>>
        : boolean
    : false

: TOp extends "sameDay"
    ? And<[
        TVal extends DateLike ? true : false,
        First<TParams> extends  DateLike ? true : false
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
        ? IsLiteral<TVal> extends true
            ? IsLiteral<TComparator> extends true
                ? Equals<TComparator, TVal>
                : boolean
        : boolean


    : TOp extends "equalsSome"
        ? SomeEqual<TParams, TVal>

    : TOp extends "contains"
        ? TVal extends string | number
            ? IsLiteral<TVal> extends true
                ? IsStringLiteral<TComparator> extends true
                    ? Contains<TVal, TComparator>
                    : boolean
            : boolean
        : false

    : TOp extends "containsSome"
        ? TVal extends string | number
            ? IsLiteral<TVal> extends true
                ? IsStringLiteral<TComparator> extends true
                    ? Contains<TVal, TComparator>
                    : boolean
            : boolean
        : false


    : TOp extends "containsAll"
        ? [TVal] extends [string | number | Tuple]
            ? [TComparator] extends [readonly string[]]
                ? ContainsAll<TVal, TParams>
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
            IsNumberLike<TVal>,
            IsNumberLike<TComparator>,
            IsGreaterThan<
                As<TVal, NumberLike>,
                As<TComparator, NumberLike>
            >
        ]>

    : TOp extends "greaterThanOrEqual"
        ? And<[
            IsNumberLike<TVal>,
            IsNumberLike<TComparator>,
            IsGreaterThanOrEqual<
                As<TVal, NumberLike>,
                As<TComparator, NumberLike>
            >
        ]>

    : TOp extends "lessThan"
        ? And<[
            IsNumberLike<TVal>,
            IsNumberLike<TComparator>,
            IsLessThan<
                As<TVal, NumberLike>,
                As<TComparator, NumberLike>
            >
        ]>

    : TOp extends "lessThanOrEqual"
        ? And<[
            IsNumberLike<TVal>,
            IsNumberLike<TComparator>,
            IsLessThanOrEqual<
                As<TVal, NumberLike>,
                As<TComparator, NumberLike>
            >
        ]>

    : TOp extends "betweenExclusively"
        ? And<[
            First<TComparator> extends NumberLike ? true : false,
            Second<TComparator> extends NumberLike ? true : false,
            TVal extends NumberLike ? true : false,
            TComparator extends [NumberLike, NumberLike]
            ? IsBetweenExclusively<
                As<TVal, NumberLike>,
                TComparator[0],
                TComparator[1]
            >
            : never
        ]>

    : TOp extends "betweenInclusively"
        ? And<[
            First<TComparator> extends NumberLike ? true : false,
            Second<TComparator> extends NumberLike ? true : false,
            TVal extends NumberLike ? true : false,
            TComparator extends [NumberLike, NumberLike]
            ? IsBetweenInclusively<
                As<TVal, NumberLike>,
                TComparator[0],
                TComparator[1]
            >
            : never
        ]>


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
        ? IsObjectLiteral<TVal> extends true
            ? TComparator extends [ infer Key extends string, infer Val ]
                ? IsStringLiteral<Key> extends true
                    ? IsEqual<TVal[As<Key, keyof TVal>], Val>
                    : boolean
            : false
        : IsObject<TVal> extends true ? boolean : false

    : TOp extends "objectKeyExtends"
        ? IsObjectLiteral<TVal> extends true
            ? TComparator extends [ infer Key extends string, infer Type ]
                ? IsStringLiteral<Key> extends true
                    ? Extends<TVal[As<Key, keyof TVal>], Type>
                    : boolean
            : false
        : IsObject<TVal> extends true ? boolean : false

    : TOp extends "objectExtends"
        ? IsObjectLiteral<TVal> extends true
            ? Extends<TVal, TComparator>
            : IsObject<TVal> extends true ? boolean : false

    : TOp extends "endsWithNumber"
        ? IsStringLiteral<TVal> extends true
            ? LastChar<As<TVal, string>> extends NumericChar
                ? true
                : false
        : IsString<TVal> extends true ? boolean : false

    : TOp extends "startsWithNumber"
        ? IsStringLiteral<TVal> extends true
            ? FirstChar<As<TVal, string>> extends NumericChar
                ? true
                : false
        : IsString<TVal> extends true ? boolean : false

    : TOp extends "onlyNumbers"
        ? IsStringLiteral<TVal> extends true
            ? IsEqual<
                RetainChars<As<TVal, string>, NumericChar>,
                TVal
            >
        : IsString<TVal> extends true ? boolean : false


    : TOp extends "onlyLetters"
        ? IsStringLiteral<TVal> extends true
            ? IsEqual<
                RetainChars<As<TVal, string>, AlphaChar>,
                TVal
            >
        : IsString<TVal> extends true ? boolean : false

    : TOp extends "alphaNumeric"
            ? IsStringLiteral<TVal> extends true
            ? IsEqual<
                RetainChars<As<TVal, string>, AlphaNumericChar>,
                TVal
            >
        : IsString<TVal> extends true ? boolean : false

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
    TParams extends GetComparisonParamInput<TOp> = ComparisonInputDefault<TOp>
> = Process<
    TVal,
    TOp,
    ComparisonInputToTuple<TOp,TParams>
>

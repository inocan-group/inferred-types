import type {
    AlphaChar,
    AlphaNumericChar,
    And,
    As,
    ComparisonAccept,
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
    Err,
    Extends,
    First,
    FirstChar,
    GetComparator,
    GetComparisonParamInput,
    GetOpConfig,
    IsAfter,
    IsBefore,
    IsBetweenExclusively,
    IsBetweenInclusively,
    IsBoolean,
    IsDateLike,
    IsEqual,
    IsFalse,
    IsFalsy,
    IsGreaterThan,
    IsGreaterThanOrEqual,
    IsLessThan,
    IsLessThanOrEqual,
    IsLiteral,
    IsObject,
    IsSameDay,
    IsSameMonth,
    IsSameMonthYear,
    IsSameYear,
    IsString,
    IsStringLiteral,
    IsTrue,
    IsTruthy,
    LastChar,
    Narrowable,
    NumberLike,
    NumericChar,
    RetainChars,
    Second,
    SomeEqual,
    StartsWith,
    Unset,
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

type Base<
    TOp extends ComparisonOperation,
    TConfig extends ComparisonLookup[TOp] = ComparisonLookup[TOp]
> = TConfig["params"];

type Accept<
    TOp extends ComparisonOperation
> = "accept" extends keyof ComparisonLookup[TOp]
    ? ComparisonLookup[TOp]["accept"]
    : unknown;

type C<
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup[TOp]["params"]
> = GetOpConfig<TOp> extends ComparisonOpConfig
    ? GetComparator<GetOpConfig<TOp>, TParams>
    : never;

type Process__DateTime<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
> = TOp extends "after"
    ? IsFalse<IsDateLike<TVal>> extends true
    ? false
    : TParams extends Base<TOp>
    ? IsLiteral<C<"after", TParams>> extends true
    ? IsAfter<As<TVal, DateLike>, C<"after", TParams>>
    : boolean
    : IsBoolean<IsDateLike<TVal>> extends true
    ? boolean
    : false

    : TOp extends "before"
    ? IsFalse<IsDateLike<TVal>> extends true
    ? false
    : TParams extends Base<TOp>
    ? IsLiteral<C<"before", TParams>> extends true
    ? IsBefore<As<TVal, DateLike>, C<"before", TParams>>
    : boolean
    : IsBoolean<IsDateLike<TVal>> extends true
    ? boolean
    : false

    : TOp extends "sameDay"
    ? IsFalse<IsDateLike<TVal>> extends true
    ? false
    : TParams extends Base<TOp>
    ? IsLiteral<C<"sameDay", TParams>> extends true
    ? IsSameDay<As<TVal, DateLike>, C<"sameDay", TParams>>
    : boolean
    : IsBoolean<IsDateLike<TVal>> extends true
    ? boolean
    : false

    : TOp extends "sameMonthYear"
    ? IsFalse<IsDateLike<TVal>> extends true
    ? false
    : TParams extends Base<TOp>
    ? IsLiteral<C<"sameMonthYear", TParams>> extends true
    ? IsSameMonthYear<
        As<TVal, DateLike>,
        C<"sameMonthYear", TParams>
    >
    : boolean
    : IsBoolean<IsDateLike<TVal>> extends true
    ? boolean
    : false

    : TOp extends "sameMonth"
    ? IsFalse<IsDateLike<TVal>> extends true
    ? false
    : TParams extends Base<TOp>
    ? IsLiteral<C<"sameMonth", TParams>> extends true
    ? IsSameMonth<
        As<TVal, DateLike>,
        C<"sameMonth", TParams>
    >
    : boolean
    : IsBoolean<IsDateLike<TVal>> extends true
    ? boolean
    : false

    : TOp extends "sameYear"
    ? IsFalse<IsDateLike<TVal>> extends true
    ? false
    : TParams extends Base<TOp>
    ? IsLiteral<C<"sameYear", TParams>> extends true
    ? IsSameYear<
        As<TVal, DateLike>,
        C<"sameYear", TParams>
    >
    : boolean
    : IsBoolean<IsDateLike<TVal>> extends true
    ? boolean
    : false
    : Unset;

type Process__General<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
> = TOp extends "extends"
    ? DoesExtend<TVal, TParams[number]>

    : TOp extends "equals"
        ? IsEqual<TVal,TParams[0]>

    : TOp extends "false"
    ? IsFalse<TVal>

    : TOp extends "falsy"
    ? IsFalsy<TVal>

    : TOp extends "true"
    ? IsTrue<TVal>

    : TOp extends "truthy"
    ? IsTruthy<TVal>

    : TOp extends "equalsSome"
        ? SomeEqual<TParams, TVal>

    : TOp extends "contains"
        ? Contains<
            As<TVal, string | number | readonly Narrowable[]>,
            As<TParams[0], Narrowable>
        >

    : TOp extends "containsSome"
    ? TParams extends Base<"containsSome">
    ? TVal extends Accept<"containsSome">
    ? Contains<
        As<TVal, Accept<"containsSome">>,
        TParams
    >
    : false
    : false

    : TOp extends "containsAll"
    ? TParams extends Base<"containsAll">
    ? TVal extends Accept<"containsAll">
    ? ContainsAll<
        As<TVal, Accept<"containsAll">>,
        TParams
    >
    : false
    : false
    : Unset;

type Process__String<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
> = TOp extends "startsWith"
    ? [TParams] extends [Base<"startsWith">]
    ? [TVal] extends [Accept<"startsWith">]
    ? [TVal] extends [readonly (string | number | boolean)[]]
    ? {
        [K in keyof TVal]: StartsWith<
            [TVal[K]] extends [boolean | number]
            ? `${TVal[K]}`
            : [TVal[K]] extends [string]
            ? TVal[K]
            : never,
            C<"startsWith", TParams>
        >
    }

    : [TVal] extends [(string | number | boolean)]
    ? StartsWith<
        [TVal] extends [boolean | number]
        ? `${TVal}`
        : [TVal] extends [string]
        ? TVal
        : never,
        C<"startsWith", TParams>
    >
    : false
    : false
    : false

    : TOp extends "endsWith"
    ? [TParams] extends [Base<"endsWith">]
    ? [TVal] extends [Accept<"endsWith">]
    ? [TVal] extends [readonly (string | number | boolean)[]]
    ? {
        [K in keyof TVal]: EndsWith<
            [TVal[K]] extends [boolean | number]
            ? `${TVal[K]}`
            : [TVal[K]] extends [string]
            ? TVal[K]
            : never,
            C<"endsWith", TParams>
        >
    }

    : [TVal] extends [(string | number | boolean)]
    ? EndsWith<
        [TVal] extends [boolean | number]
        ? `${TVal}`
        : [TVal] extends [string]
        ? TVal
        : never,
        C<"endsWith", TParams>
    >
    : false
    : false
    : false

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
    ? TVal extends ""
        ? false
    : IsEqual<
        RetainChars<As<TVal, string>, NumericChar>,
        TVal
    >
    : IsString<TVal> extends true ? boolean : false

    : TOp extends "onlyLetters"
    ? IsStringLiteral<TVal> extends true
    ? TVal extends ""
        ? false
    : IsEqual<
        RetainChars<As<TVal, string>, AlphaChar>,
        TVal
    >
    : IsString<TVal> extends true ? boolean : false

    : TOp extends "alphaNumeric"
    ? IsStringLiteral<TVal> extends true
    ? TVal extends ""
        ? false
    : IsEqual<
        RetainChars<As<TVal, string>, AlphaNumericChar>,
        TVal
    >
    : IsString<TVal> extends true ? boolean : false

    : Unset;

type Process__Object<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
> = TOp extends "objectKeyGreaterThan"
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

    : TOp extends "objectKeyGreaterThanOrEqual"
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

    : TOp extends "objectKeyLessThan"
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

    : TOp extends "objectKeyLessThanOrEqual"
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

    : TOp extends "objectKeyEquals"
    ? TParams extends Base<"objectKeyEquals">
    ? C<"objectKeyEquals", TParams> extends [
        infer Key extends string,
        infer Val
    ]
    ? IsStringLiteral<Key> extends true
    ? IsEqual<TVal[As<Key, keyof TVal>], Val>
    : boolean
    : false
    : IsObject<TVal> extends true ? boolean : false

    : TOp extends "objectKeyExtends"
    ? TParams extends Base<"objectKeyExtends">
    ? C<"objectKeyExtends", TParams> extends [
        infer Key extends string,
        infer Val
    ]
    ? IsStringLiteral<Key> extends true
    ? Extends<TVal[As<Key, keyof TVal>], Val>
    : boolean
    : false
    : IsObject<TVal> extends true ? boolean : false

    : Unset;

type Process__Numeric<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
> = TOp extends "greaterThan"
    ? TParams extends Base<"greaterThan">
    ? TVal extends Accept<"greaterThan">
    ? IsGreaterThan<
        TVal,
        C<"greaterThan", TParams>
    >
    : false
    : false

    : TOp extends "greaterThanOrEqual"
    ? TParams extends Base<"greaterThanOrEqual">
    ? TVal extends Accept<"greaterThanOrEqual">
    ? IsGreaterThanOrEqual<
        TVal,
        C<"greaterThanOrEqual", TParams>
    >
    : false
    : false

    : TOp extends "lessThan"
    ? TParams extends Base<"lessThan">
    ? TVal extends Accept<"lessThan">
    ? IsLessThan<
        TVal,
        C<"lessThan", TParams>
    >
    : false
    : false

    : TOp extends "lessThanOrEqual"
    ? TParams extends Base<"lessThanOrEqual">
    ? TVal extends Accept<"lessThanOrEqual">
    ? IsLessThanOrEqual<
        TVal,
        C<"lessThanOrEqual", TParams>
    >
    : false
    : false

    : TOp extends "betweenExclusively"
    ? TParams extends Base<"betweenExclusively">
    ? TVal extends Accept<"betweenExclusively">
    ? C<"betweenExclusively", TParams> extends [
        infer Min extends NumberLike,
        infer Max extends NumberLike
    ]
    ? IsBetweenExclusively<
        TVal,
        Min,
        Max
    >
    : false
    : false
    : false

    : TOp extends "betweenInclusively"
    ? TParams extends Base<"betweenInclusively">
    ? TVal extends Accept<"betweenInclusively">
    ? C<"betweenInclusively", TParams> extends [
        infer Min extends NumberLike,
        infer Max extends NumberLike
    ]
    ? IsBetweenInclusively<
        TVal,
        Min,
        Max
    >
    : false
    : false
    : false
    : Unset;

type Process__Other<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
> = TOp extends "errors"
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

    : TOp extends "returnEquals"
    ? TVal extends ((...args: any[]) => any)
    ? IsEqual<ReturnType<TVal>, TParams>
    : false

    : TOp extends "returnExtends"
    ? TVal extends ((...args: any[]) => any)
    ? Extends<ReturnType<TVal>, TParams>
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

    : TOp extends "returnEquals"
    ? TVal extends ((...args: any[]) => any)
    ? IsEqual<ReturnType<TVal>, TParams>
    : false

    : TOp extends "returnExtends"
    ? TVal extends ((...args: any[]) => any)
    ? Extends<ReturnType<TVal>, TParams>
    : false
    : Unset;

/**
 * process the type for the comparison
 */
type Comparison<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
> = Process__DateTime<TVal, TOp, TParams> extends Unset
    ? Process__General<TVal, TOp, TParams> extends Unset
    ? Process__String<TVal, TOp, TParams> extends Unset
    ? Process__Object<TVal, TOp, TParams> extends Unset
    ? Process__Numeric<TVal, TOp, TParams> extends Unset
    ? Process__Other<TVal, TOp, TParams> extends Unset
    ? Err<
        `invalid-operation/compare`,
        `The operation '${TOp}' is not a recognized operation in the Compare<...> type utility!`
    >
    : Process__Other<TVal, TOp, TParams>
    : Process__Numeric<TVal, TOp, TParams>
    : Process__Object<TVal, TOp, TParams>
    : Process__String<TVal, TOp, TParams>
    : Process__General<TVal, TOp, TParams>
    : Process__DateTime<TVal, TOp, TParams>;

/**
 * **Compare**`<TVal,TOp,TComparator>`
 *
 * Compares the value `TVal` with `TComparator` using
 * the `TOp` _operator_.
 */
export type Compare<
    TVal extends ComparisonAccept<TOp>,
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup[TOp]["params"] = ComparisonLookup[TOp]["params"]
> = Comparison<
    TVal,
    TOp,
    TParams
>;

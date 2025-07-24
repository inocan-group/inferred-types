import type {
    AlphaChar,
    AlphaNumericChar,
    AnyFunction,
    AreIncompatible,
    As,
    AsString,
    ComparisonAccept,
    ComparisonOperation,
    Contains,
    ContainsAll,
    DateLike,
    DoesExtend,
    EndsWith,
    EndsWithNumber,
    Err,
    Extends,
    First,
    FirstChar,
    IsAfter,
    IsBefore,
    IsBetweenExclusively,
    IsBetweenInclusively,
    IsBoolean,
    IsDateLike,
    IsEqual,
    IsError,
    IsFalse,
    IsFalsy,
    IsGreaterThan,
    IsGreaterThanOrEqual,
    IsLessThan,
    IsLessThanOrEqual,
    IsLiteral,
    IsNever,
    IsObject,
    IsSameDay,
    IsSameMonth,
    IsSameMonthYear,
    IsSameYear,
    IsString,
    IsStringLiteral,
    IsTemplateLiteral,
    IsTrue,
    IsTruthy,
    IsWideScalar,
    Narrowable,
    NumberLike,
    NumericChar,
    Or,
    RetainChars,
    Second,
    SomeEqual,
    StartsWith,
    Suggest,
    TupleToUnion,
    TypedFunction,
    Unset
} from "inferred-types/types";

/**
 * **Comparator**
 *
 * A _comparator_ is a runtime function which is created when calling
 * the `compare(op, params) utility.
 *
 * - a _comparator_ also has `op`, and `params` properties
 */
export type Comparator<
    TOp extends string,
    TParams extends readonly unknown[]
> = [IsNever<TOp>] extends [true]
    ? Err<`invalid-operation`, `An invalid operation was presented as a Comparator!`>
    : {
        kind: "comparator";
        op: TOp;
        params: TParams;
    } & (
    <const TVal extends ComparisonAccept<TOp>>(val: TVal) => Compare<TVal, TOp, TParams>
);

type Process__DateTime<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
> = TOp extends "after"
    ? TVal extends DateLike
        ? First<TParams> extends DateLike
            ? IsAfter<TVal, First<TParams>>
            : false
        : Err<`invalid-value/not-date-like`>

    : TOp extends "before"
        ? IsDateLike<TVal> extends false
            ? Err<
                `invalid-value/not-date-like`,
                `The '${TOp}' operation expects the value passed in to be a valid representation of a date but it was not!`,
                { val: TVal }
            >
            : TParams extends Base<TOp>
                ? IsLiteral<C<"before", TParams>> extends true
                    ? IsBefore<As<TVal, DateLike>, C<"before", TParams>>
                    : boolean
                : IsBoolean<IsDateLike<TVal>> extends true
                    ? boolean
                    : false

        : TOp extends "sameDay"
            ? [IsDateLike<TVal>] extends [false]
                ? Err<
                    `invalid-value/not-date-like`,
                `The '${TOp}' operation expects the value passed in to be a valid representation of a date but it was not!`,
                { val: TVal }
                >
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
    ? DoesExtend<TVal, TupleToUnion<TParams>>


    : TOp extends "equals"
        ? IsEqual<TVal, TParams[0]>

    : TOp extends "false"
        ? [TVal] extends [boolean]
            ? [boolean] extends [TVal]
                ? boolean // TVal is exactly boolean
                : IsFalse<TVal> // TVal is a literal boolean (true or false)
        : // Handle specific cases that might have cross-module issues
        [TVal] extends [null]
            ? false
            : [TVal] extends [undefined]
                ? false
                : [TVal] extends [0]
                    ? false
                    : [TVal] extends [""]
                        ? false
                        : [TVal] extends [true]
                            ? false
                            : [TVal] extends [false]
                                ? true
                                : IsFalse<TVal>

    : TOp extends "falsy"
                ? IsFalsy<TVal>

    : TOp extends "true"
                    ? // Use AreIncompatible to determine if we can make specific determinations
                    AreIncompatible<TVal, true> extends true
                        ? false // If TVal is incompatible with true, it definitely isn't true
                        : IsTrue<TVal>

                    : TOp extends "truthy"
                        ? IsTruthy<TVal>

                        : TOp extends "equalsSome"
                            ? SomeEqual<TParams, TVal>

                            : TOp extends "contains"
                                ? TVal extends string | number | readonly unknown[]
                                    ? Contains<
                                        TVal,
                                        As<TParams[0], Narrowable>
                                    >
                                    : false

                                : TOp extends "containsSome"
                                    ? TVal extends string | number | readonly unknown[]
                                        ? Contains<
                                            As<TVal, ComparisonAccept<"containsSome">>,
                                            TParams
                                        >
                                        : false

                                    : TOp extends "containsAll"
                                        ? TVal extends string | number | readonly unknown[]
                                            ? ContainsAll<
                                                As<TVal, ComparisonAccept<"containsAll">>,
                                                TParams
                                            >
                                            : false
                                        : Unset;

type Process__String<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
> = TOp extends "startsWith"
    ? [TParams] extends [Base<"startsWith">]
        ? [TVal] extends [ComparisonAccept<"startsWith">]
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
            ? [TVal] extends [ComparisonAccept<"endsWith">]
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
            ? EndsWithNumber<TVal>

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

                            : TOp extends "isTemplateLiteral"
                                ? IsStringLiteral<TVal> extends true
                                    ? IsTemplateLiteral<TVal>
                                    : false

                                : Unset;

type Process__Object<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
> = TOp extends "objectKeyGreaterThan"
    ? IsObject<TVal> extends false
        ? Err<
            `invalid-value/wrong-type`,
            `The '${TOp}' operation expects the value passed in to be a dictionary object but it wasn't!`
        >
        : [Extends<Second<TParams>, NumberLike>] extends [true]
            ? [First<TParams>] extends [keyof TVal]
                ? Extends<TVal[First<TParams>], NumberLike> extends true
                    ? IsGreaterThan<
                        As<TVal[First<TParams>], NumberLike>,
                        As<Second<TParams>, NumberLike>
                    >
                    : Err<
                        `invalid-value/non-numeric`,
                    `The '${TOp}' operation expects the key '${AsString<First<TParams>>}' in the value passed in to be a numeric value but it wasn't!`,
                    { val: TVal }
                    >
                : false // not a key of
            : Err<
            `invalid-params/${TOp}`,
            `The '${TOp}' operation expects the second param to be NumberLike but it wasn't!`,
            { val: TVal; params: TParams; invalid: TParams[1] }
            >

    : TOp extends "objectKeyGreaterThanOrEqual"
        ? IsObject<TVal> extends false
            ? Err<
                `invalid-value/wrong-type`,
                `The '${TOp}' operation expects the value passed in to be a dictionary object but it wasn't!`
            >
            : [Extends<Second<TParams>, NumberLike>] extends [true]
                ? [First<TParams>] extends [keyof TVal]
                    ? Extends<TVal[First<TParams>], NumberLike> extends true
                        ? IsGreaterThanOrEqual<
                            As<TVal[First<TParams>], NumberLike>,
                            As<Second<TParams>, NumberLike>
                        >
                        : Err<
                            `invalid-value/non-numeric`,
                    `The '${TOp}' operation expects the key '${AsString<First<TParams>>}' in the value passed in to be a numeric value but it wasn't!`,
                    { val: TVal }
                        >
                    : false // not a key of
                : Err<
            `invalid-params/${TOp}`,
            `The '${TOp}' operation expects the second param to be NumberLike but it wasn't!`,
            { val: TVal; params: TParams; invalid: TParams[1] }
                >

        : TOp extends "objectKeyLessThan"
            ? IsObject<TVal> extends false
                ? Err<
                    `invalid-value/wrong-type`,
                `The '${TOp}' operation expects the value passed in to be a dictionary object but it wasn't!`
                >
                : [Extends<Second<TParams>, NumberLike>] extends [true]
                    ? [First<TParams>] extends [keyof TVal]
                        ? Extends<TVal[First<TParams>], NumberLike> extends true
                            ? IsLessThan<
                                As<TVal[First<TParams>], NumberLike>,
                                As<Second<TParams>, NumberLike>
                            >
                            : Err<
                                `invalid-value/non-numeric`,
                    `The '${TOp}' operation expects the key '${AsString<First<TParams>>}' in the value passed in to be a numeric value but it wasn't!`,
                    { val: TVal }
                            >
                        : false // not a key of
                    : Err<
            `invalid-params/${TOp}`,
            `The '${TOp}' operation expects the second param to be NumberLike but it wasn't!`,
            { val: TVal; params: TParams; invalid: TParams[1] }
                    >
            : TOp extends "objectKeyLessThanOrEqual"
                ? IsObject<TVal> extends false
                    ? Err<
                        `invalid-value/wrong-type`,
                `The '${TOp}' operation expects the value passed in to be a dictionary object but it wasn't!`
                    >
                    : [Extends<Second<TParams>, NumberLike>] extends [true]
                        ? [First<TParams>] extends [keyof TVal]
                            ? Extends<TVal[First<TParams>], NumberLike> extends true
                                ? IsLessThanOrEqual<
                                    As<TVal[First<TParams>], NumberLike>,
                                    As<Second<TParams>, NumberLike>
                                >
                                : Err<
                                    `invalid-value/non-numeric`,
                    `The '${TOp}' operation expects the key '${AsString<First<TParams>>}' in the value passed in to be a numeric value but it wasn't!`,
                    { val: TVal }
                                >
                            : false // not a key of
                        : Err<
            `invalid-params/${TOp}`,
            `The '${TOp}' operation expects the second param to be NumberLike but it wasn't!`,
            { val: TVal; params: TParams; invalid: TParams[1] }
                        >

                : TOp extends "objectKeyEquals"
                    ? IsObject<TVal> extends false
                        ? Err<
                            `invalid-value/wrong-type`,
                `The '${TOp}' operation expects the value passed in to be a dictionary object but it wasn't!`
                        >
                        : [First<TParams>] extends [keyof TVal]
                            ? IsEqual<TVal[First<TParams>], Second<TParams>>
                            : false

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
    ? TVal extends NumberLike
        ? TParams[0] extends NumberLike
            ? Or<[IsWideScalar<TVal>, IsWideScalar<TParams[0]>]> extends true
                ? boolean
                : IsGreaterThan<
                    TVal,
                    TParams[0]
                >
            : false
        : false

    : TOp extends "greaterThanOrEqual"
        ? TVal extends NumberLike
            ? TParams[0] extends NumberLike
                ? Or<[IsWideScalar<TVal>, IsWideScalar<TParams[0]>]> extends true
                    ? boolean
                    : IsGreaterThanOrEqual<
                        TVal,
                        TParams[0]
                    >
                : false
            : false

        : TOp extends "lessThan"
            ? TVal extends NumberLike
                ? TParams[0] extends NumberLike
                    ? Or<[IsWideScalar<TVal>, IsWideScalar<TParams[0]>]> extends true
                        ? boolean
                        : IsLessThan<
                            TVal,
                            TParams[0]
                        >
                    : false
                : false

            : TOp extends "lessThanOrEqual"
                ? TVal extends NumberLike
                    ? TParams[0] extends NumberLike
                        ? Or<[IsWideScalar<TVal>, IsWideScalar<TParams[0]>]> extends true
                            ? boolean
                            : IsLessThanOrEqual<
                                TVal,
                                TParams[0]
                            >
                        : false
                    : false

                : TOp extends "betweenExclusively"
                    ? TVal extends NumberLike
                        ? TParams extends readonly [
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

                    : TOp extends "betweenInclusively"
                        ? TVal extends NumberLike
                            ? TParams extends readonly [
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
                        : Unset;

type Process__Other<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
> = TOp extends "errors"
    ? IsError<TVal>

    : TOp extends "errorsOfType"
        ? TVal extends Error
            ? "type" extends keyof TVal
                ? First<TParams> extends TVal["type"]
                    ? true
                    : false
                : false
            : false

        : TOp extends "returnEquals"
            ? TVal extends TypedFunction
                ? IsEqual<ReturnType<TVal>, TParams[0]>
                : TVal extends AnyFunction
                    ? boolean
                    : false

            : TOp extends "returnExtends"
                ? TVal extends ((...args: any[]) => any)
                    ? Extends<ReturnType<TVal>, TParams[0]>
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
 *
 * When either TVal or any parameter is a wide type (like `string`, `number`),
 * returns `boolean` instead of a definitive `true`/`false`.
 */
type ValidateParams<
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[]
> = TOp extends "equals"
    ? TParams extends readonly [unknown]
        ? true
        : Err<"invalid-parameters", "equals operation requires exactly 1 parameter">
    : TOp extends "equalsSome"
        ? TParams extends readonly [unknown, unknown, ...unknown[]]
            ? true
            : Err<"invalid-parameters", "equalsSome operation requires at least 2 parameters">
        : TOp extends "extends"
            ? TParams extends readonly [unknown, ...unknown[]]
                ? true
                : Err<"invalid-parameters", "extends operation requires exactly 1 parameter">
            : true;

export type Compare<
    TVal extends ComparisonAccept<TOp>,
    TOp extends Suggest<ComparisonOperation>,
    TParams extends readonly unknown[]
> = TOp extends ComparisonOperation
    ? ValidateParams<TOp, TParams> extends Error
        ? ValidateParams<TOp, TParams>
        : Comparison<TVal, TOp, TParams>

    : Err<
    `invalid-operation/${TOp}`,
    `The operation '${TOp}' is not a valid operation for the Compare utility!`,
    { op: TOp; params: TParams }
    >;

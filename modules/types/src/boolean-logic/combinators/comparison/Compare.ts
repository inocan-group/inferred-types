import type {
    AlphaChar,
    AlphanumericChar,
    AnyFunction,
    AreIncompatible,
    As,
    AsString,
    ComparisonAccept,
    ComparisonOperation,
    Contains,
    ContainsAll,
    DateLike,
    Dictionary,
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
    IsDictionary,
    IsEqual,
    IsError,
    IsFalse,
    IsFalsy,
    IsGreaterThan,
    IsGreaterThanOrEqual,
    IsLessThan,
    IsLessThanOrEqual,
    IsNever,
    IsSameDay,
    IsSameMonth,
    IsSameMonthYear,
    IsSameYear,
    IsString,
    IsStringLiteral,
    IsTemplateLiteral,
    IsTrue,
    IsTruthy,
    Narrowable,
    NumberLike,
    NumericChar,
    RetainChars,
    Second,
    SomeEqual,
    StartsWith,
    Suggest,
    TupleToUnion,
    TypedFunction,
    Unset,
    ToStringArray,
    IsEqual
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
        ? TVal extends DateLike
            ? First<TParams> extends DateLike
                ? IsBefore<TVal, First<TParams>>
                : Err<
                    `invalid-params/not-date-like`,
                    `The '${TOp}' operation expects the parameter used for comparator to be a valid representation of a date but it was not!`,
                    { param: TVal; val: TVal }
                >
            : Err<
                `invalid-value/not-date-like`,
                `The '${TOp}' operation expects the value passed in to be a valid representation of a date but it was not!`,
                { val: TVal }
            >

        : TOp extends "sameDay"
            ? TVal extends DateLike
                ? First<TParams> extends DateLike
                    ? IsSameDay<TVal, First<TParams>>
                    : Err<`invalid-params/not-date-like`>
                : Err<`invalid-value/not-date-like`>

            : TOp extends "sameMonthYear"
                ? TVal extends DateLike
                    ? First<TParams> extends DateLike
                        ? IsSameMonthYear<TVal, First<TParams>>
                        : Err<
                            `invalid-params/not-date-like`,
                    `The '${TOp}' operation expects the parameter used for comparator to be a valid representation of a date but it was not!`,
                    { param: TVal; val: TVal }
                        >
                    : Err<
                        `invalid-value/not-date-like`,
                `The '${TOp}' operation expects the value passed in to be a valid representation of a date but it was not!`,
                { val: TVal }
                    >

                : TOp extends "sameMonth"
                    ? TVal extends DateLike
                        ? First<TParams> extends DateLike
                            ? IsSameMonth<TVal, First<TParams>>
                            : Err<
                                `invalid-params/not-date-like`,
                    `The '${TOp}' operation expects the parameter used for comparator to be a valid representation of a date but it was not!`,
                    { param: TVal; val: TVal }
                            >
                        : Err<
                            `invalid-value/not-date-like`,
                `The '${TOp}' operation expects the value passed in to be a valid representation of a date but it was not!`,
                { val: TVal }
                        >

                    : TOp extends "sameYear"
                        ? TVal extends DateLike
                            ? First<TParams> extends DateLike
                                ? IsSameYear<TVal, First<TParams>>
                                : Err<
                                    `invalid-params/not-date-like`,
                    `The '${TOp}' operation expects the parameter used for comparator to be a valid representation of a date but it was not!`,
                    { param: TVal; val: TVal }
                                >
                            : Err<
                                `invalid-value/not-date-like`,
                `The '${TOp}' operation expects the value passed in to be a valid representation of a date but it was not!`,
                { val: TVal }
                            >
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
                : [TVal] extends [null]
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
                    ? AreIncompatible<TVal, true> extends true
                        ? false // If TVal is incompatible with true, it definitely isn't true
                        : IsTrue<TVal>

                : TOp extends "truthy"
                        ? IsTruthy<TVal>

                        : TOp extends "equalsSome"
                            ? TParams extends readonly [...infer L]
                                ? number extends As<L, readonly unknown[]>["length"]
                                    ? boolean
                                    : SomeEqual<As<L, readonly unknown[]>, TVal>
                                : boolean

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
    ? TVal extends ComparisonAccept<"startsWith">
        ? TParams extends readonly (string | number)[]
            ? number extends TParams["length"]
                ? boolean
                : StartsWith<As<TVal, string | number>, TParams[number]>
            : Err<`invalid-type/parameters`>
        : Err<
            `invalid-value/wrong-type`,
            `The '${TOp}' operation expects the value passed in to be a valid representation of a date but it was not!`,
            { val: TVal }
        >

    : TOp extends "endsWith"
        ? TVal extends ComparisonAccept<"endsWith">
            ? TParams extends readonly (string | number)[]
                ? number extends TParams["length"]
                    ? boolean
                    : EndsWith<As<TVal, string | number>, TParams[number]>
                : Err<`invalid-type/parameters`>
            : Err<
                `invalid-value/wrong-type`,
                `The '${TOp}' operation expects the value passed in to be a valid representation of a date but it was not!`,
                { val: TVal }
            >

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
                                        RetainChars<As<TVal, string>, AlphanumericChar>,
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
    ? IsDictionary<TVal> extends false
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
        ? IsDictionary<TVal> extends false
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
            ? IsDictionary<TVal> extends false
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
                ? IsDictionary<TVal> extends false
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
                    ? IsDictionary<TVal> extends false
                        ? Err<
                            `invalid-value/wrong-type`,
    `The '${TOp}' operation expects the value passed in to be a dictionary object but it wasn't!`
                        >
                        : [First<TParams>] extends [keyof TVal]
                            ? IsEqual<TVal[First<TParams>], Second<TParams>>
                            : false

                    : TOp extends "objectKeyExtends"
                        ? TVal extends Dictionary
                            ? First<TParams> extends keyof TVal
                                ? TVal[First<TParams>] extends Second<TParams>
                                    ? true
                                    : false
                                : false
                            : Err<`invalid-value`, `The operation '' expects values to be a valid container!`, { val: TVal; params: TParams }>

                        : Unset;

type Process__Numeric<
    TVal,
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[],
>
= TOp extends "greaterThan"
    ? TVal extends NumberLike
        ? First<TParams> extends NumberLike
            ? IsGreaterThan<
                TVal,
                First<TParams>
            >
            : Err<
                `invalid-param/not-number-like`,
                `The operation '${TOp}' expects the first parameter to be NumberLike!`,
                { val: TVal; params: TParams }
            >
        : Err<
            `invalid-value/not-number-like`,
            `The operation '${TOp}' expects the value to be compared with the comparator to be NumberLike!`,
            { val: TVal; params: TParams }
        >

    : TOp extends "greaterThanOrEqual"
        ? TVal extends NumberLike
            ? First<TParams> extends NumberLike
                ? IsGreaterThanOrEqual<
                    TVal,
                    First<TParams>
                >
                : Err<
                    `invalid-param/not-number-like`,
                `The operation '${TOp}' expects the first parameter to be NumberLike!`,
                { val: TVal; params: TParams }
                >
            : Err<
                `invalid-value/not-number-like`,
            `The operation '${TOp}' expects the value to be compared with the comparator to be NumberLike!`,
            { val: TVal; params: TParams }
            >

        : TOp extends "lessThan"
            ? TVal extends NumberLike
                ? First<TParams> extends NumberLike
                    ? IsLessThan<
                        TVal,
                        First<TParams>
                    >
                    : Err<
                        `invalid-param/not-number-like`,
                `The operation '${TOp}' expects the first parameter to be NumberLike!`,
                { val: TVal; params: TParams }
                    >
                : Err<
                    `invalid-value/not-number-like`,
            `The operation '${TOp}' expects the value to be compared with the comparator to be NumberLike!`,
            { val: TVal; params: TParams }
                >

            : TOp extends "lessThanOrEqual"
                ? TVal extends NumberLike
                    ? First<TParams> extends NumberLike
                        ? IsLessThanOrEqual<
                            TVal,
                            First<TParams>
                        >
                        : Err<
                            `invalid-param/not-number-like`,
                `The operation '${TOp}' expects the first parameter to be NumberLike!`,
                { val: TVal; params: TParams }
                        >
                    : Err<
                        `invalid-value/not-number-like`,
            `The operation '${TOp}' expects the value to be compared with the comparator to be NumberLike!`,
            { val: TVal; params: TParams }
                    >

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

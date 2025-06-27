import type {
    As,
    EmptyObject,
    Err,
    HasLeadingTemplateLiteral,
    IsTrue,
    IsWideType,
    NumericChar,
    StartsWith,
    StripLeading
} from "inferred-types/types";

export type TakeNumericOptions = {
    /**
     * require a string (or string union) which must immediately
     * follow the end of numeric characters.
     */
    mustFollow?: string;

    /**
     * meant as string literal or union type which expresses
     * characters which should be ignored:
     *
     * - the sequence continues but the ignored character
     * is not added to the result
     * - a common choice would be the `,` character
     */
    ignore?: string;
};

type Chars<T extends boolean> = [IsTrue<T>] extends [true]
    ? NumericChar
    : NumericChar | ".";

type Finish<
    TRemaining extends string,
    TOpt extends TakeNumericOptions,
    TTake extends string
> = TOpt["mustFollow"] extends string
    ? IsWideType<TOpt["mustFollow"]> extends true
        ? Err<`invalid-follow`, `The TakeNumeric utility was passed a wide string for the optional 'mustFollow' property!`>
        : StartsWith<TRemaining, TOpt["mustFollow"]> extends true
            ? [ TTake, TRemaining ]
            : [ undefined, `${TTake}${TRemaining}`]
    : [TTake, TRemaining];

type Take<
    TRemaining extends string,
    TOpt extends TakeNumericOptions,
    TTake extends string,
    TDecimal extends boolean = false
> = TRemaining extends `${infer First extends Chars<TDecimal>}${infer Rest extends string}`
    ? Take<
        Rest,
        TOpt,
        `${TTake}${First}`,
        First extends "."
            ? true
            : TDecimal
    >
    : TOpt["ignore"] extends string
        ? TRemaining extends `${infer _Ignore extends TOpt["ignore"]}${infer Rest extends string}`
            ? Take<
                Rest,
                TOpt,
                TTake
            >
            : Finish<TRemaining, TOpt, TTake>
        : Finish<TRemaining, TOpt, TTake>;

/**
 * **TakeNumeric**`<T, [TOpt]>`
 *
 * Takes the numeric value from the front of the string and returns
 * a tuple of the form:
 *
 * - `[`${number}`, string ]`
 *
 * If there are no numeric characters at the start of the string
 * then _undefined_ is returned:
 *
 * - `[ undefined, string ]`
 *
 * This utility will work decimals and with negative numbers but you can't use
 * the literal `-.001`, use `-0.001` instead.
 *
 * ### Options
 *
 * - `mustFollow`
 *
 *     - When defined as a string literal, it will _require_ that
 *     the character(s) immediately following the numeric characters
 *     must _extend_ this value.
 *     - a common use case would be require _white space_ after the number
 *
 * - `ignore`
 *
 *      - When we're _taking_ in characters we take in all numeric characters
 *      and the `.` character to pick up decimal values.
 *      - Sometimes -- like in the case of `,` -- we might want to continue
 *      moving into the numeric value while ignoring some characters
 */
export type TakeNumeric<
    T extends string,
    TOpt extends TakeNumericOptions = EmptyObject,
> = As<
    IsWideType<T> extends true
        ? [`${number}` | undefined, string]
        : HasLeadingTemplateLiteral<T> extends true
            ? [`${number}` | undefined, string]
            : StartsWith<T, `-.${Chars<true>}`> extends true
                ? Take<StripLeading<T, "-.">, TOpt, "-.", true>
                : StartsWith<T, `.${Chars<true>}`> extends true
                    ? Take<StripLeading<T, ".">, TOpt, ".", true>
                    : StartsWith<T, `-${Chars<true>}`> extends true
                        ? Take<StripLeading<T, "-">, TOpt, "-">
                        : StartsWith<T, Chars<true>> extends true
                            ? Take<T, TOpt, "">
                            : [undefined, T],
    [ take: `${number}` | undefined, remaining: string ]
    | Error
>;

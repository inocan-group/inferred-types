import { AfterFirst, And, Chars, DefaultNesting, Err,  First, IsNestingEnd, IsNestingMatchEnd, IsNestingStart, Join, Nesting, Pop, ToStringLiteral } from "inferred-types/types";

type FindLast<
    TChars extends readonly string[],
    TFind extends string,
    TNesting extends Nesting,
    TInclude extends boolean,
    TRtn extends string = "",
    TLevel extends readonly string[] = []
> = [] extends TChars
? TLevel["length"] extends 0
    ? Err<
        `not-found/retain-until-nested`,
        `The character '${TFind}' was not found anywhere at the base level of the nesting stack!`,
        {
            find: TFind,
            content: TRtn,
            nesting: ToStringLiteral<TNesting>
        }
    >
    : Err<
        `unbalanced/retain-until-nested`,
        `After reaching the end of the characters of the string, it appears that the nesting stack is not balanced! There are still the following items on the stack: ${Join<TLevel, ", ">}`
    >
: And<[
    First<TChars> extends TFind ? true : false,
    TLevel["length"] extends 0 ? true : false
 ]> extends true
    ? [TInclude] extends [true]
        ? `${TRtn}${First<TChars>}`
        : TRtn
: And<[
    IsNestingEnd<First<TChars>,TNesting>,
    TLevel["length"] extends 1 ? true : false,
    IsNestingMatchEnd<
        First<TChars>,
        TLevel,
        TNesting
    >,
    First<TChars> extends TFind ? true : false
]> extends true
    ? [TInclude] extends [true]
        ? `${TRtn}${First<TChars>}`
        : TRtn
: IsNestingMatchEnd<First<TChars>, TLevel, TNesting> extends true
    ? FindLast<
        AfterFirst<TChars>,
        TFind,
        TNesting,
        TInclude,
        `${TRtn}${First<TChars>}`,
        Pop<TLevel>
    >
: IsNestingStart<First<TChars>, TNesting> extends true
    ? FindLast<
        AfterFirst<TChars>,
        TFind,
        TNesting,
        TInclude,
        `${TRtn}${First<TChars>}`,
        [...TLevel, First<TChars>]
    >
    : FindLast<
        AfterFirst<TChars>,
        TFind,
        TNesting,
        TInclude,
        `${TRtn}${First<TChars>}`,
        TLevel
    >;

/**
 * **RetainUntil__Nested**`<TStr, TFind, [TInclude], [TNesting]>`
 *
 * A _nesting aware_ variant of `RetainUntil`:
 *
 * - will retain characters in `TStr` until it finds `TFind`
 * at the root nesting level
 * - if `TNesting` is not defined then the `DefaultNesting`
 * configuration will be used but any config from `Nesting` is
 * valid.
 * - the `TInclude` value determines whether the `TFind` character
 * is included or not in the returned string. It defaults to true.
 */
export type RetainUntil__Nested<
    TStr,
    TFind extends string,
    TInclude extends boolean = true,
    TNesting extends Nesting = DefaultNesting,
> = TStr extends string
? string extends TStr
    ? string
: FindLast<Chars<TStr>,TFind,TNesting,TInclude>
: TStr extends Error
    ? TStr
    : Err<
        "invalid-type/string",
        `The AfterLast__Nested utility was passed a non-string value to TStr!`,
        { str: TStr }
    >;

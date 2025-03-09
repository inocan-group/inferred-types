import type {
    AfterFirst,
    AsFromTo,
    Expand,
    ExtractCaptureGroups,
    First,
    Increment,
    RegexHandlingStrategy,
    RemoveIndexKeys,
    ReplaceAllFromTo,
    RetainAfter,
    StringLiteralTemplate,
    StripAfter,
    StripSurroundingStringTemplate,
} from "inferred-types/types";

export type RegexGroupValue = string | number | bigint | boolean | null | undefined;

type RegexToTemplate = AsFromTo<{
    "(.+?)": `${string}`;
    "(\\d+)": `${number}`;
    "(true|false)": `${boolean}`;
}>;

/**
 * Converts the psuedo Regex (which hasn't been escaped to be "real" regex)
 * back to the curly braced template blocks expected by the `StringLiteralTemplate`
 * utility.
 */
type PrettyRegexToTemplate = AsFromTo<{
    "(.+?)": `{{string}}`;
    "(\\d+)": `{{number}}`;
    "(true|false)": `{{boolean}}`;
}>;


type AsTemplateString<
T extends string
> = T extends `^${infer Inner}$`
? ReplaceAllFromTo<Inner, PrettyRegexToTemplate>
: T extends `.*(${infer Inner}).*`
    ? `${string}${ReplaceAllFromTo<Inner, PrettyRegexToTemplate>}${string}`
    : never;


type GroupTypes<
    T extends readonly RegexGroupValue[],
    Idx extends number = 1,
    R extends Record<number, string> = {}
> = [] extends T
    ? Expand<R> extends Record<number, string>
        ? Expand<R>
        : never
    : GroupTypes<
        AfterFirst<T>,
        Increment<Idx>,
    R & Record<Idx, `${First<T>}`>
    >;

type _RegexArray<
    TGroups extends readonly RegexGroupValue[],
    TTmpl extends string,
    TStrat extends RegexHandlingStrategy,
    TValue extends string,
    TLen extends number = TGroups["length"],
    TGroupTypes extends Record<number, string> = GroupTypes<TGroups>,
    TIdx extends number = 1,
    TResults extends Record<number, string> = {}
> = [] extends TGroups
    ? RemoveIndexKeys<
    Expand<
        TResults &
        Record<"kind", "RegexArray"> &
        Record<"gt", TGroups> &
        Record<"matchStrategy", TStrat> &
        (TStrat extends "subset"
            ? Record<"template", StripSurroundingStringTemplate<TTmpl>>
            : Record<"template", TTmpl>
        ) &
        RegExpExecArray &
        TGroupTypes &
        Record<0, TValue> &
        (
            TStrat extends "subset"
                ? Record<
                    1,
                    StringLiteralTemplate<StripSurroundingStringTemplate<TTmpl>>
                >
                : {}
        ) &
        Record<"length", TLen> &
        Record<"input", TValue>
    >
>
    : _RegexArray<
        AfterFirst<TGroups>,
        TTmpl,
        TStrat,
        TValue,
        TLen,
        TGroupTypes,
        Increment<TIdx>,
        TResults & Record<TIdx, `${First<TGroups>}`>
    >;

type IsRegexSubsetStrategy<T extends string> = T extends `.*(${string}`
    ? true
    : false;

/***
 * **RegexArray**`<TGroups, [TValue]>`
 *
 * When you call `exec()` on a regular expression you get a `RegExpExecArray` type
 * in return. Unfortunately this has no type information but this type tries to solve this.
 *
 * - When a successful match is made, the matched expression will be returned in it's entirety
 * as the first element (aka, index 0)
 * - the remaining array elements are
 */
export type RegexArray<
    /** the template in a RegExp-like format for human readability */
    TTempl extends string,
    TValue extends string = string
> = _RegexArray<
    ExtractCaptureGroups<AsTemplateString<TTempl>, IsRegexSubsetStrategy<TTempl>>,
    AsTemplateString<TTempl>,
    TTempl extends `.*(${string}`
        ? "subset"
        : "exact",
    TValue
>;


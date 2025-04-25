import type {
    AsUnion,
    IsWideString,
    RetainAfter,
    IsSubstring,
    BeforeLast,
    Last,
    StripAfter,
    Length,
} from "inferred-types/types";

type Policy = "omit" | "before" | "after" | "inline";

type Get<
    TContent extends string,
    TSep extends string
> = {
    before: StripAfter<TContent,TSep>,
    sep: TContent extends `${StripAfter<TContent,TSep>}${infer Sep}${RetainAfter<TContent,TSep>}`
        ? Sep
        : never,
    after: RetainAfter<TContent,TSep>
}

type Process<
    TContent extends string,
    TSep extends string,
    TPolicy extends Policy,
    TParts extends readonly string[] = []
> = IsSubstring<TContent,TSep> extends true
? Process<
    Get<TContent, TSep>["after"],
    TSep,
    TPolicy,
    TPolicy extends "omit"
    ? Get<TContent, TSep>["before"] extends ""
        ? TParts
        : [...TParts, Get<TContent, TSep>["before"]]
    : TPolicy extends "inline"
    ? Get<TContent, TSep>["before"] extends ""
        ? [...TParts, Get<TContent, TSep>["sep"]]
        : [...TParts, Get<TContent, TSep>["before"], Get<TContent, TSep>["sep"]]
    : TPolicy extends "before"
    ? [
        ...TParts,
        `${Get<TContent, TSep>["before"]}${Get<TContent, TSep>["sep"]}`
    ]
    : TPolicy extends "after"
    ? Length<TParts> extends 0
        ? [
            Get<TContent, TSep>["before"]
        ]
        : [
            ...BeforeLast<TParts>,
            `${Get<TContent, TSep>["sep"]}${Last<TParts>}`,
            Get<TContent, TSep>["before"]
        ]
    : never
>
: TContent extends ""
    ? TParts
    : [...TParts, TContent];



/**
 * **Split**`<TContent,TSep,[TPolicy]>`
 *
 * Splits a string into a tuple of strings; based on the `TSep` _separator_
 * character.
 *
 * ```ts
 * // [ "Foo", "Bar"]
 * type FooBar = Split<"FooBar", UpperAlphaChar, "before">;
 * // [ "foo", "bar", "baz"]
 * type FooBarBaz = Split<"foo, bar, baz", ", ">;
 * ```
 */
export type Split<
    TContent extends string,
    TSep extends string | readonly string[],
    TPolicy extends Policy = "omit"
> = IsWideString<TContent> extends true
? string[]
: TContent extends ""
    ? []
: Process<TContent, AsUnion<TSep>, TPolicy>;

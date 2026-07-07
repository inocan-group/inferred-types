import type {
    AsUnion,
    IsSubstring,
    IsWideString,
    Length,
    RetainAfter,
    StripAfter,
} from "inferred-types/types";

type Policy = "omit" | "before" | "after" | "inline";

interface Get<
    TContent extends string,
    TSep extends string
> {
    before: StripAfter<TContent, TSep>;
    sep: TContent extends `${StripAfter<TContent, TSep>}${infer Sep}${RetainAfter<TContent, TSep>}`
        ? Sep
        : never;
    after: RetainAfter<TContent, TSep>;
}

type Process<
    TContent extends string,
    TSep extends string,
    TPolicy extends Policy,
    TParts extends readonly string[] = []
> = IsSubstring<TContent, TSep> extends true
    ? Get<TContent, TSep> extends infer G extends { before: string; sep: string; after: string }
        ? Process<
            G["after"],
            TSep,
            TPolicy,
            TPolicy extends "omit"
                ? G["before"] extends ""
                    ? TParts
                    : [...TParts, G["before"]]
                : TPolicy extends "inline"
                    ? G["before"] extends ""
                        ? [...TParts, G["sep"]]
                        : [...TParts, G["before"], G["sep"]]
                    : TPolicy extends "before"
                        ? [
                                ...TParts,
            `${G["before"]}${G["sep"]}`
                            ]
                        : TPolicy extends "after"
                            ? Length<TParts> extends 0
                                ? [G["before"]]
                                : TParts extends readonly [...infer Head extends string[], infer Tail extends string]
                                    ? [
                                            ...Head,
                `${G["sep"]}${Tail}`,
                G["before"]
                                        ]
                                    : [G["before"]]
                            : never
        >
        : never
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
export type Split2<
    TContent extends string,
    TSep extends string | readonly string[],
    TPolicy extends Policy = "omit"
> = IsWideString<TContent> extends true
    ? string[]
    : TContent extends ""
        ? []
        : AsUnion<TSep> extends infer Sep extends string
            ? Process<TContent, Sep, TPolicy>
            : never;

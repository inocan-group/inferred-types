import type { IsWideString, StripChars, Whitespace } from "inferred-types/types";

export type IsWhitespace<T> = T extends string
    ? IsWideString<T> extends true
        ? boolean
        : StripChars<T, Whitespace> extends ""
            ? true
            : false
    : false;

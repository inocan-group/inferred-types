import type {
    AsString,
    Concat,
    Err,
    IsGreaterThanOrEqual,
    Repeat,
    StringLength,
    Subtract
} from "inferred-types/types";

/**
 * **PadEnd**`<TContent,TChar,TLen>`
 *
 * A type utility which ensures that `TContent` reaches a length
 * of `TLen` by adding an appropriate number of `TChar` characters
 * to the end of the string.
 *
 * - if `TContent` is _equal to_ or _longer_ then `TLen` it will be passed
 * through unchanged
 * - if `TChar` is not exactly 1 character in length then an `Err<"invalid-char/pad-end">`
 * error will be returned.
 */
export type PadEnd<
    TContent extends string | number,
    TChar extends string,
    TLen extends number
> = StringLength<TChar> extends 1
    ? IsGreaterThanOrEqual<
        StringLength<AsString<TContent>>,
        TLen
    > extends true
        ? TContent
        : AsString<TContent> extends infer Content extends string
            ? StringLength<Content> extends infer ContentLen extends number
                ? Subtract<TLen, ContentLen> extends infer PadCount extends number
                    ? Concat<[
                        Content,
                        Repeat<TChar, PadCount>
                    ]>
                    : TContent  // Fallback if Subtract fails
                : TContent  // Fallback if StringLength fails
            : TContent  // Fallback if AsString fails
    : Err<
        `invalid-char/pad-end`,
        `The PadEnd<TContent,TChar,TLen> utility expects TChar to have exactly 1 character!`,
        { char: TChar; content: TContent; len: TLen }
    >;

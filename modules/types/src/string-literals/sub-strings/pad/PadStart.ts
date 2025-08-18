import type { AsString, Concat, Err, IsGreaterThanOrEqual, Repeat, StringLength, Subtract } from "inferred-types/types";

/**
 * **PadStart**`<TContent,TChar,TLen>`
 *
 * A type utility which ensures that `TContent` reaches a length
 * of `TLen` by adding an appropriate number of `TChar` characters
 * to the beginning of the string.
 *
 * - if `TContent` is _equal to_ or _longer_ then `TLen` it will be passed
 * through unchanged
 * - if `TChar` is not exactly 1 character in length then an `Err<"invalid-char/pad-start">`
 * error will be returned.
 */
export type PadStart<
    TContent extends string | number,
    TChar extends string,
    TLen extends number
> = StringLength<TChar> extends 1
    ? IsGreaterThanOrEqual<
        StringLength<AsString<TContent>>,
        TLen
    > extends true
        ? AsString<TContent>
        : AsString<TContent> extends infer Content extends string
            ? StringLength<Content> extends infer ContentLen extends number
                ? Subtract<TLen, ContentLen> extends infer PadCount extends number
                    ? Concat<[
                        Repeat<TChar, PadCount>,
                        Content
                    ]>
                    : AsString<TContent>  // Fallback if Subtract fails
                : AsString<TContent>  // Fallback if StringLength fails
            : AsString<TContent>  // Fallback if AsString fails
    : Err<
        `invalid-char/pad-start`,
        `The PadStart<TContent,TChar,TLen> utility expects TChar to have exactly 1 character that condition was not met!`,
        { char: TChar; content: TContent; len: TLen }
    >;

import type {
    As,
    AsNumber,
    IsWideNumber,
    IsWideString
} from "inferred-types/types";

type Process<
    TContent extends string,
    TStrip extends string,
> = TContent extends `${infer Before}${TStrip}`
        ? Before
        : TContent;

/**
 * **StripEnding**`<TContent, TStrip>`
 *
 * Will strip off `TStrip` from the ending of `TContent` when
 * it is found.
 *
 * ```ts
 * type T = "Hello World";
 * type U = " World";
 * // "Hello"re
 * type R = StripEnding<T,U>;
 * ```
 */
export type StripTrailing<
    TContent extends string | number,
    TStrip extends string | number,
> = As<
    IsWideNumber<TContent> extends true
        ? number
        : IsWideString<TContent> extends true
        ? string
        : TContent extends number
            ? AsNumber<Process<`${TContent}`,`${TStrip}`>>
            : Process<`${TContent}`,`${TStrip}`>,
        string
>;

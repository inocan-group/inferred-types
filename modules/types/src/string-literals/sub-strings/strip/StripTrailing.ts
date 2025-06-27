import type {
    AsNumber,
    IsWideType
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
> = TContent extends number
    ? number extends TContent
        ? number
        : IsWideType<TStrip> extends true
            ? number
            : AsNumber<Process<`${TContent}`, `${TStrip}`>>
    : TContent extends string
        ? string extends TContent
            ? string
            : IsWideType<TStrip> extends true
                ? string
                : Process<TContent, `${TStrip}`>
        : never;

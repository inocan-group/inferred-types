/**
 * **StripLeading**`<TContent, TStrip>`
 *
 * **StripLeading**`<TContent, TStrip>`
 *
 * Strips a leading string from another string when both are
 * string literals.
 *
 * ```ts
 * // "world"
 * type T = StripLeading<"hello world", "hello ">;
 * ```
 */
export type StripLeading<
    TContent extends string | number,
    TStrip extends string | number,
> = TContent extends string
    ? TStrip extends string
        ? TContent extends `${TStrip}${infer After}`
            ? After
            : TContent
        : TContent
    : TContent extends number
        ? TStrip extends string | number
            ? `${TContent}` extends `${TStrip}${infer After}`
                ? After extends `${infer N extends number}`
                    ? N
                    : After
                : TContent
            : TContent
        : never;

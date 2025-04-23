import type { As, Contains, IsSet, IsUnset, Join, Replace, RetainAfter, RetainUntil, Split, StripLeading, Trim, Unset } from "inferred-types/types";

type After<
    TText extends string,
    TFind extends string,
> = Split<
    TText,
    TFind,
    "before"
> extends readonly [...[string, ...string[]], infer Last extends string]
    ? StripLeading<Last, TFind>
    : never;

/**
 * ***AfterLast**`<TText,TFind,[TBreak],[TTrim]>`
 *
 * Provides the text in `TText` _after_ the last instance of the `TFind`
 * character.
 *
 * - if the `TFind` character is not found in `TText` then an empty
 * string will be returned
 * - if a `TBreak` character is provided then all text after the _first_
 * occurance of this break character will be excluded for purposes of
 * the `TFind` matching but will be added back into the final resulting
 * text output.
 * - by default the whitespace found on both sides of the returned string
 * are maintained but if you'd prefer to have it trimmed you can set
 * `TTrim` to **true**.
 *
 * **Related:** `UntilLast`
 */
export type AfterLast<
    TText extends string,
    TFind extends string,
    TBreak extends string | Unset = Unset,
    TTrim extends boolean = false
> = Contains<TText, TFind> extends true
    ? IsUnset<TBreak> extends true
        ? After<TText, TFind>
        : TTrim extends true
            ? Trim<Join<[
                After<RetainUntil<TText, As<TBreak, string>>, TFind>,
                Replace<TText, RetainUntil<TText, As<TBreak, string>>, "">
            ]>>
            : Join<[
                After<RetainUntil<TText, As<TBreak, string>>, TFind>,
                Replace<TText, RetainUntil<TText, As<TBreak, string>>, "">
            ]>
    : IsSet<TBreak> extends true
        ? TTrim extends true
            ? Trim<RetainAfter<TText, TFind, true>>
            : RetainAfter<TText, TFind, true>
        : "";

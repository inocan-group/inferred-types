import type {
    AfterFirst,
    First,
    FromTo,
    IsGreaterThan,
    IsStringLiteral,
    Replace,
    TakeFirst,
} from "inferred-types/types";

type ProcessFromTo<
    TText extends string,
    TFromTo extends readonly FromTo[],
> = [] extends TFromTo
    ? TText
    : First<TFromTo> extends { from: infer From extends string; to: infer To extends string }
        ? ProcessFromTo<Replace<TText, From, To>, AfterFirst<TFromTo>>
        : never;

type MAX = 35;

type ExcessProcessor<
    TText extends string,
    TFromTo extends readonly FromTo[],
> = ProcessFromTo<TText, TakeFirst<TFromTo, MAX>>;

/**
 * **ReplaceFromTo**`<TText, TFromTo>`
 *
 * Replaces the first instance of each `from` element of `TFromTo` found in
 * `TText` with the cooresponding `to` value in `TFromTo`.
 *
 * ```ts
 * type Fooy = "fooy";
 * // "Pooey"
 * type Pooey = Replace<Fooy, [
 *    { from: "y"; to: "ey" },
 *    { from: "f"; to: "P" }
 * ]>;
 *
 * **Related:** `Replace`, `ReplaceAll`,  `ReplaceAllToFrom`
 * - does allow TText to be passed in as a _symbol_ but when it is
 * it is ignored and passed through
 * - it also allows numeric values to be passed through and in those cases
 * the numbers are converted to a `NumberLike` type
 */
export type ReplaceFromTo<
    TText extends string | symbol | number,
    TFromTo extends readonly FromTo[],
> = TText extends string
    ? IsStringLiteral<TText> extends true
        ? IsGreaterThan<TFromTo["length"], MAX> extends true
            ? ExcessProcessor<TText, TFromTo>
            : ProcessFromTo<TText, TFromTo>
        : string
    : TText extends number
        ? ReplaceFromTo<`${TText}`, TFromTo>
        : TText;

import type {
  AfterFirst,
  First,
  FromTo,
  IsStringLiteral,
  ReplaceAll,
} from "inferred-types/types";

type ProcessFromTo<
  TText extends string,
  TFromTo extends readonly FromTo[],
> = [] extends TFromTo
  ? TText
  : First<TFromTo> extends { from: infer From extends string; to: infer To extends string }
    ? ProcessFromTo<ReplaceAll<TText, From, To>, AfterFirst<TFromTo>>
    : never;

/**
 * **ReplaceAllFromTo**`<TText, TFromTo>`
 *
 * Replaces the _all instances_ of the `from` element of `TFromTo` found in
 * `TText` with the cooresponding `to` value in `TFromTo`.
 *
 * ```ts
 * // "Foo-bar-baz"
 * type Dashing = Replace<"Foo Bar Baz", [
 *    { from: " "; to: "-" },
 *    { from: "B"; to: "b" }
 * ]>;
 * ```
 * **Related:** `Replace`, `ReplaceAll`,  `ReplaceAllToFrom`
 *
 * **Notes:**
 * - does allow TText to be passed in as a _symbol_ but when it is
 * it is ignored and passed through
 * - it also allows numeric values to be passed through and in those cases
 * the numbers are converted to a `NumberLike` type
 */
export type ReplaceAllFromTo<
  TText extends string | symbol | number,
  TFromTo extends readonly FromTo[],
> = TText extends string
  ? IsStringLiteral<TText> extends true
    ? ProcessFromTo<TText, TFromTo>
    : string
  : TText extends number
    ? ReplaceAllFromTo<`${TText}`, TFromTo>
    : TText;

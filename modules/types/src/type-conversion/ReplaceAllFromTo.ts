import type {
  FromTo,
  ReplaceAll,
} from "inferred-types/types";

type ReplaceAllFromToLiteral<
  S extends string,
  Mappings extends readonly { from: string; to: string }[],
> = Mappings extends readonly [
  infer First extends { from: string; to: string },
  ...infer Rest extends { from: string; to: string }[],
]
  ? ReplaceAllFromToLiteral<ApplyMapping<S, First>, Rest>
  : S;

type ApplyMapping<
  S extends string,
  Mapping extends { from: string; to: string },
> = ReplaceAll<S, Mapping["from"], Mapping["to"]>;

// type MAX = 35;

// type ExcessProcessor<
//     TText extends string,
//     TMappings extends readonly FromTo[],
// > = ReplaceAllFromToLiteral<TText, TakeFirst<TMappings, MAX>> extends string
//     ? string
//     : never

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
 * **Related:** `Replace`, `ReplaceAll`
 *
 * **Notes:**
 * - does allow TText to be passed in as a _symbol_ but when it is
 * it is ignored and passed through
 * - it also allows numeric values to be passed through and in those cases
 * the numbers are converted to a `NumberLike` type
 */
export type ReplaceAllFromTo<
  TText extends string | number | symbol,
  TMappings extends readonly FromTo[],
> = TText extends string
  ? ReplaceAllFromToLiteral<TText, TMappings>
  : TText extends number
    ? ReplaceAllFromTo<`${TText}`, TMappings>
    : TText;

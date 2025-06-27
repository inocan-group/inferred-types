import type {
    FromTo,
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

type ReplaceAllLiterals<
    TText extends string,
    TFind extends string,
    TReplace extends string,
> = TText extends `${infer Head}${TFind}${infer Tail}`
    ? `${Head}${TReplace}${ReplaceAllLiterals<Tail, TFind, TReplace>}`
    : TText;

type ApplyMapping<
    S extends string,
    Mapping extends { from: string; to: string },
> = ReplaceAllLiterals<S, Mapping["from"], Mapping["to"]>;

/**
 * **ReplaceAllFromTo**`<TText, TMappings>`
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

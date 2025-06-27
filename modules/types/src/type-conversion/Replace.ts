import type {
    If,
    IsEqual,
    IsStringLiteral,
} from "inferred-types/types";

type Process<
    TText extends string,
    TFind extends string,
    TReplace extends string,
> = TText extends ""
    ? If<IsEqual<TFind, "">, TReplace, "">
    : TFind extends ""
        ? TText
        : TText extends `${infer F}${TFind}${infer E}`
            ? `${F}${TReplace}${E}`
            : TText;

/**
 * **Replace**`<TText,TFind,TReplace>`
 *
 * Type utility which takes a string `TText` and finds the _first instance_ of
 * `TFind` and replaces it with `TReplace`.
 *
 * ```ts
 * type Fooy = "fooy";
 * // "Foo"
 * type Foo = Replace<Fooy, "y", "">;
 * ```
 *
 * Alternatively you can pass in `TFind` as an array of `FromTo` objects to describe
 * multiple transformations at once.
 *
 * ```ts
 * type Fooy = "fooy";
 * // "Pooey"
 * type Pooey = Replace<Fooy, [
 *    { from: "y"; to: "ey" },
 *    { from: "f"; to: "P" }
 * ]>;
 * ```
 *
 * **Related:** `ReplaceAll`, `ReplaceToFrom`, `ReplaceAllToFrom`
 */
export type Replace<
    TText extends string,
    TFind extends string,
    TReplace extends string,
> = IsStringLiteral<TText> extends true
    ? Process<TText, TFind, TReplace>
    : string;

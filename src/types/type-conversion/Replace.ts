/**
 * **Replace**`<TText,TFind,TReplace>`
 * 
 * Type utility which takes a string `TText` and finds the first instance of
 * `TFind` and replaces it with `TReplace`.
 * 
 * ```ts
 * const fooy = "fooy";
 * // "Foo"
 * type Foo = Replace<typeof fooy, "y", "">;
 * ```
 *
 * **Related:** `ReplaceAll`
 */
export type Replace<
  TText extends string, 
  TFind extends string, 
  TReplace extends string
> = TText extends ""
  ? ""
  : TFind extends ""
    ? TText
    : TText extends `${infer F}${TFind}${infer E}`
    ? `${F}${TReplace}${E}`
    : TText;

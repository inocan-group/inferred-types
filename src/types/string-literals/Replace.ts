/**
 * Type utility which takes a string `S` and replaces the substring `W` with `P`.
 * ```ts
 * const fooy = "fooy";
 * // "Foo"
 * type Foo = Replace<typeof fooy, "y", "">;
 * ```
 * 
 * Note: _the first match is replaced and all subsequent matches are ignored_
 */
export type Replace<S extends string, W extends string, P extends string> =
  S extends "" ? "" : W extends "" ? S :
  S extends `${infer F}${W}${infer E}` ? `${F}${P}${E}` : S;
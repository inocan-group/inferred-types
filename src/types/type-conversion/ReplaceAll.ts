import {  IfStringLiteral } from "src/types/index";
import { Replace } from "./Replace";


/**
 * **Replace**`<TText,TFind,TReplace>`
 * 
 * Type utility which takes a string `TText` and finds all instances of
 * `TFind` and replaces it with `TReplace`.
 * 
 * ```ts
 * const fooy = "fooy";
 * // "Foo"
 * type Foo = Replace<typeof fooy, "y", "">;
 * ```
 *
 * **Related:** `Replace`
 */
export type ReplaceAll<
  TText extends string, 
  TFind extends string, 
  TReplace extends string
> = IfStringLiteral<
  TText,
  IfStringLiteral<
    TFind,
    Replace<TText,TFind,TReplace> extends `${string}${TFind}${string}`
      ? ReplaceAll<
          Replace<TText,TFind,TReplace>,
          TFind,
          TReplace
        >
      : Replace<TText,TFind,TReplace>,
    string
  >,
  string
>;

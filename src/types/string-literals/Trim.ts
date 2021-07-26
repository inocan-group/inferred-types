import { Whitespace } from "../alphabetic";

/**
 * Trims off blank spaces, `\n` and `\t` characters from both sides of a _string literal_.
 * ```ts
 * // "foobar"
 * type T = Trim<"\n\t  foobar ">;
 * // string
 * type T = Trim<string>;
 * ```
 */
export type Trim<S extends string> = string extends S ? string :
  S extends `${Whitespace}${infer Right}` ?
  Trim<Right> : S extends `${infer Left}${Whitespace}` ? Trim<Left> : S;


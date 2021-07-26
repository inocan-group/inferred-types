import { Whitespace } from "../alphabetic";

/**
 * Trims off blank spaces, `\n` and `\t` characters from both sides of a _string literal_.
 */
export type Trim<S extends string> = S extends `${Whitespace}${infer Right}` ?
  Trim<Right> : S extends `${infer Left}${Whitespace}` ? Trim<Left> : S;
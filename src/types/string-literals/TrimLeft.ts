import { Whitespace } from "../alphabetic";

/**
 * Trims off whitespace on left of string
 * ```ts
 * // "foobar "
 * type T = TrimLeft<"\n\t  foobar ">;
 * // string
 * type T = TrimLeft<string>;
 * ```
 */
export type TrimLeft<S extends string> = string extends S ? string :
  S extends `${Whitespace}${infer Right}` ?
  TrimLeft<Right> : S;
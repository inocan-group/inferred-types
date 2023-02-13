import { Whitespace } from "src/types/string-literals";

/**
 * Trims off whitespace on left of string
 * ```ts
 * // "\n foobar"
 * type T = TrimRight<"\n foobar \t">;
 * // string
 * type T = TrimRight<string>;
 * ```
 */
export type TrimRight<S extends string> = string extends S ? string :
  S extends `${infer Right}${Whitespace}` ?
  TrimRight<Right> : S;

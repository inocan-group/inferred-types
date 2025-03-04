import type { Whitespace } from "inferred-types/types";

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

/**
 * Trims off whitespace at the start of the string
 * ```ts
 * // "foobar "
 * type T = TrimStart<"\n\t  foobar ">;
 * // string
 * type T = TrimStart<string>;
 * ```
 */
export type TrimStart<S extends string> = TrimLeft<S>;

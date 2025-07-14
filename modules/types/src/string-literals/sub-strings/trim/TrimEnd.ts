import type { Whitespace } from "inferred-types/types";

/**
 * Trims off whitespace on right of string
 * ```ts
 * // "\n foobar"
 * type T = TrimRight<"\n foobar \t">;
 * // string
 * type T = TrimRight<string>;
 * ```
 *
 * @deprecated use `TrimEnd<T>` instead
 */
export type TrimRight<S extends string> = string extends S ? string :
    S extends `${infer Right}${Whitespace}` ?
        TrimRight<Right> : S;

/**
 * Trims off whitespace on end of the string
 *
 * ```ts
 * // "\n foobar"
 * type T = TrimEnd<"\n foobar \t">;
 * // string
 * type T = TrimEnd<string>;
 * ```
 */
export type TrimEnd<S extends string> = string extends S ? string :
    S extends `${infer Right}${Whitespace}` ?
        TrimEnd<Right> : S;



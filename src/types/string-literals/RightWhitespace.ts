import type { Replace, TrimRight } from "~/types";

/**
 * Provides the _left_ whitespace of a string
 * ```ts
 * // "\n\t "
 * type T = LeftWhitespace<"\n\t foobar">;
 * ```
 */
export type RightWhitespace<S extends string> = string extends S ? string : Replace<S, TrimRight<S>, "">;
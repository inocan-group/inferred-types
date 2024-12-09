import type { Replace } from "./Replace";
import type { TrimRight } from "./TrimRight";

/**
 * Provides the _left_ whitespace of a string
 * ```ts
 * // "\n\t "
 * type T = LeftWhitespace<"\n\t foobar">;
 * ```
 */
export type RightWhitespace<S extends string> = string extends S
  ? string
  : Replace<S, TrimRight<S>, "">;

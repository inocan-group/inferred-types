import type { Replace, TrimLeft } from "inferred-types/types";

/**
 * Provides the _left_ whitespace of a string
 * ```ts
 * // "\n\t "
 * type T = LeftWhitespace<"\n\t foobar">;
 * ```
 */
export type LeftWhitespace<S extends string> = string extends S
    ? string
    : Replace<
        S,
        TrimLeft<S> extends string
            ? TrimLeft<S>
            : never,
        ""
    >;

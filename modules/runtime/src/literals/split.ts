import type { Chars, IsEqual, Split } from "inferred-types/types";

type Policy = "omit" | "before" | "after";

/**
 * **split**`(str, sep, [policy = "omit"])`
 *
 * Splits a string on a given separator while preserving string literal typing
 * when possible.
 */
export function split<
    T extends string,
    S extends string,
    P extends Policy = "omit"
>(
    str: T,
    sep: S,
    policy: P = "omit" as P
) {
    return str.split(sep) as unknown as IsEqual<S, ""> extends true
        ? Chars<T>
        : Split<T,S,P>
}


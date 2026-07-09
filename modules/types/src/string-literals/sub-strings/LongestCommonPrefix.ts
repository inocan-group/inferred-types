import type { As, IsWideString, UnionToTuple } from "inferred-types/types";

/**
 * The longest common prefix shared by the two _concrete_ string literals
 * `A` and `B`, compared a character at a time.
 */
type CommonPrefix2<
    A extends string,
    B extends string,
    TAcc extends string = "",
> = A extends `${infer AHead}${infer ARest}`
    ? B extends `${infer BHead}${infer BRest}`
        // AHead / BHead are single characters here; require equality in both
        // directions so that only genuinely-identical characters accumulate.
        ? AHead extends BHead
            ? BHead extends AHead
                ? CommonPrefix2<ARest, BRest, `${TAcc}${AHead}`>
                : TAcc
            : TAcc
        : TAcc
    : TAcc;

/**
 * Reduces a tuple of string literals down to the single prefix common to
 * every element. A _wide_ `string` element collapses the result to `""`
 * because no literal prefix can be guaranteed (and it also protects the
 * character recursion from a non-terminating wide-string match).
 */
type CommonPrefixReduce<
    T extends readonly string[],
    TAcc extends string | null = null,
> = T extends readonly [
    infer Head extends string,
    ...infer Rest extends readonly string[],
]
    ? [IsWideString<Head>] extends [true]
        ? ""
        : CommonPrefixReduce<
            Rest,
            [TAcc] extends [null] ? Head : CommonPrefix2<TAcc & string, Head>
        >
    : [TAcc] extends [null]
        ? ""
        : TAcc & string;

/**
 * **LongestCommonPrefix**`<T>`
 *
 * Given a string literal `T` — most usefully a _union_ of string literals —
 * resolves to the longest character sequence that prefixes **every** member
 * of the union.
 *
 * ```ts
 * // "hi "
 * type P = LongestCommonPrefix<"hi Bob" | "hi Nancy">;
 * // "hi Bob"  (a single literal is its own prefix)
 * type S = LongestCommonPrefix<"hi Bob">;
 * // ""  (nothing shared / wide string)
 * type N = LongestCommonPrefix<"foo" | "bar">;
 * ```
 *
 * **Related:** `Widen`, `StartsWith`
 */
export type LongestCommonPrefix<T extends string> = [IsWideString<T>] extends [
    true,
]
    ? ""
    : CommonPrefixReduce<As<UnionToTuple<T>, readonly string[]>>;

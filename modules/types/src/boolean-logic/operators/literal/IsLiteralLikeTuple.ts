import type { IsAny, IsNever, IsUnion } from "inferred-types/types";
import { And, Not, TupleMeta } from "inferred-types/types";

/**
 * **IsLiteralLikeTuple**`<T>`
 *
 * Tests whether the _shape_ of the tuple is literal.
 *
 * - to be a literal-like tuple it must have a fixed number of keys
 * - the _types_ at each key position can be wide or literal and still make a match
 *
 * ```ts
 * // true
 * type T1 = IsLiteralLikeTuple<[1, 2, 3]>;
 * type T2 = IsLiteralLikeTuple<[string, number, string]>;
 * // false
 * type F1 = IsLiteralLikeTuple<string[]>;
 * type F2 = IsLiteralLikeTuple<string, number, ...string[]>;
 * ```
 *
 * **Related:** `IsLiteralLikeArray`
 */
export type IsLiteralLikeTuple<T>
= [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : [T] extends [readonly unknown[]]
            ? [number] extends [T["length"]]
                ? false
                : IsUnion<T["length"]> extends true
                    ? false
                    : true
            : false;

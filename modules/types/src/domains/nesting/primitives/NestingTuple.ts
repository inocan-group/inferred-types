import { Nesting } from "./Nesting";
import { ExceptionRules } from "types/domains";

/**
 * **NestingTuple**
 *
 * A tuple which represents a nesting configuration:
 *
 * - **Simple (backward compatible)**: `[start, end]`
 *   - `start` is a tuple of strings representing all characters allowed to start the nesting
 *   - `end` is either a tuple of characters which terminate the nesting, or if `end` is _undefined_
 *     then the nesting terminates when the characters in `start` end.
 *
 * - **Hierarchical (new)**: `[start, end, nextLevel]`
 *   - Same as simple form, but with an optional third element
 *   - `nextLevel` is the `Nesting` configuration to use inside this nesting level
 *
 * - **Hierarchical with exceptions**: `[start, end, nextLevel, exceptions]`
 *   - Same as hierarchical form, but with an optional fourth element
 *   - `exceptions` defines when the entry/exit delimiters should be ignored
 *
 * **Examples:**
 *
 * ```ts
 * // Simple (backward compatible)
 * type Simple = [["(", "["], [")", "]"]]
 *
 * // Hierarchical - different tokens at next level
 * type Multi = [["(", "["], [")", "]"], { "{": "}" }]
 *
 * // Hierarchical with exceptions - ignore `>` when preceded by `=`
 * type ArrowSafe = [["<"], [">"], {}, { exit: { ignorePrecededBy: ["="] } }]
 * ```
 */
export type NestingTuple =
    | [start: readonly string[], end: readonly string[] | undefined]
    | [start: readonly string[], end: readonly string[] | undefined, nextLevel: Nesting]
    | [start: readonly string[], end: readonly string[] | undefined, nextLevel: Nesting, exceptions: ExceptionRules];

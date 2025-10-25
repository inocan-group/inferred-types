import type { GetNextLevelConfig, Nesting } from "inferred-types/types";

/**
 * Helper to rebuild config by applying GetNextLevelConfig for each element except the last
 */
type _GetParentConfigRecursive<
    TStack extends readonly string[],
    TRootNesting extends Nesting,
    TCurrentConfig extends Nesting = TRootNesting
> = TStack extends readonly [infer First extends string, infer Second extends string, ...infer Rest extends string[]]
    ? Rest["length"] extends 0
        // Only two elements left - apply config for first, return that (don't process second)
        ? GetNextLevelConfig<First, TCurrentConfig>
        // More than two - apply config for first and recurse
        : _GetParentConfigRecursive<
            [Second, ...Rest],
            TRootNesting,
            GetNextLevelConfig<First, TCurrentConfig>
        >
    : TCurrentConfig;

/**
 * **GetParentConfig**`<TStack, TRootNesting>`
 *
 * Reconstructs the nesting config that was active when the last entry character (top of stack) was seen.
 *
 * This is needed for `IsNestingMatchEnd` to look up the correct exit token in hierarchical configs.
 *
 * **Logic:**
 * - If stack has ≤1 element: parent is root level
 * - Otherwise: apply `GetNextLevelConfig` for each level except the last
 *
 * **Examples:**
 * ```ts
 * // Stack ["["], root { "[": "]" } -> parent is root
 * type A = GetParentConfig<["["], { "[": "]" }>;  // { "[": "]" }
 *
 * // Stack ["{", "["], root { "{": ["}", { "[": "]" }] }
 * // Parent config at level 1 where "[" was seen
 * type B = GetParentConfig<["{", "["], { "{": ["}", { "[": "]" }] }>;  // { "[": "]" }
 * ```
 */
export type GetParentConfig<
    TStack extends readonly string[],
    TRootNesting extends Nesting
> = TStack["length"] extends 0 | 1
    ? TRootNesting
    : _GetParentConfigRecursive<TStack, TRootNesting>;

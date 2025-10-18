import { Nesting, NestingKeyValue } from "inferred-types/types";

/**
 * **GetNextLevelConfig**`<TEntry, TNesting>`
 *
 * Extracts the nesting configuration to use inside a nesting level that
 * starts with `TEntry`.
 *
 * - For **simple configs** (string values): Returns the same config (no hierarchy)
 * - For **hierarchical key-value** configs: Extracts `nextLevel` from `[exit, nextLevel]` tuple
 * - For **hierarchical tuple** configs: Extracts the third element if present
 * - If character is not in config: Returns the same config
 *
 * **Examples:**
 *
 * ```ts
 * // Simple config - returns same
 * type A = GetNextLevelConfig<"(", { "(": ")" }>;  // { "(": ")" }
 *
 * // Hierarchical - extract empty config
 * type B = GetNextLevelConfig<'"', { '"': ['"', {}] }>;  // {}
 *
 * // Hierarchical - extract nested config
 * type C = GetNextLevelConfig<"(", { "(": [")", { "[": "]" }] }>;  // { "[": "]" }
 * ```
 */
export type GetNextLevelConfig<
    TEntry extends string,
    TNesting extends Nesting
> = [TNesting] extends [NestingKeyValue]
    ? TEntry extends keyof TNesting
        ? TNesting[TEntry] extends readonly [infer _Exit extends string, infer NextLevel]
            // Hierarchical form (readonly tuple) - extract nextLevel
            ? NextLevel
            : TNesting[TEntry] extends [infer _Exit extends string, infer NextLevel]
                // Hierarchical form (mutable tuple) - extract nextLevel
                ? NextLevel
                // Simple form - return same config
                : TNesting
        // Character not in config - return same config
        : TNesting
    : [TNesting] extends [[infer _Start extends readonly string[], infer _End extends readonly string[] | undefined, infer NextLevel]]
        // Hierarchical tuple (3 elements) - extract third element
        ? NextLevel
        // Simple tuple (2 elements) - return same config
        : TNesting;

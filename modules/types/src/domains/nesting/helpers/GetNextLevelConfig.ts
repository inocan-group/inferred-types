import type { As, Nesting, NestingKeyValue } from "inferred-types/types";
import type { NormalizeNestingEntry } from "./NormalizeNestingEntry";

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
> = As<
    [TNesting] extends [NestingKeyValue]
        ? TEntry extends keyof TNesting
            ? NormalizeNestingEntry<TNesting[TEntry], TNesting>["children"]
        // Character not in config - return same config
            : TNesting
        : [TNesting] extends [readonly [infer _Start extends readonly string[], infer End, infer NextLevel extends Nesting]]
            // Hierarchical tuple (3 elements) - extract third element
            ? End extends readonly string[] | undefined
                ? NextLevel
                : End extends { children?: infer Children extends Nesting }
                    ? Children
                    : NextLevel
            : [TNesting] extends [readonly [infer _Start extends readonly string[], infer End]]
                ? End extends { children?: infer Children extends Nesting }
                    ? Children
            // Simple tuple (2 elements) - return same config
                    : TNesting
                : TNesting,
    Nesting
>;

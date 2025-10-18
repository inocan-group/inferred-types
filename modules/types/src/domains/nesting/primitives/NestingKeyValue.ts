import { Nesting } from "./Nesting";
import { NestedException } from "types/domains"


export type NestingKeyValueConfig = {
    /** the exit token */
    exit: string,

    /**
     * optionally specify a new nesting configuration for child nodes
     */
    children?: Nesting;

    /**
     * optionally add exceptions to _entry_ or _exit_ tokens.
     */
    exception?: NestedException;
}

/**
 * **NestingKeyValue**
 *
 * A key-value pair where:
 *
 * - the _keys_ are START tokens which indicate _entering_ a new nesting level
 * - the _values_ are either:
 *   - **Simple form**: END tokens (string) which indicate _exiting_ a nesting level
 *   - **Hierarchical form**: A tuple `[exit: string, nextLevel: Nesting]` where:
 *     - `exit` is the END token for this level
 *     - `nextLevel` is the nesting configuration to use inside this nesting level
 *   - **Hierarchical with exceptions**: A tuple `[exit: string, nextLevel: Nesting, exceptions: ExceptionRules]` where:
 *     - `exit` is the END token for this level
 *     - `nextLevel` is the nesting configuration to use inside this nesting level
 *     - `exceptions` defines when the entry/exit delimiters should be ignored at the CURRENT level
 *
 * **CRITICAL CLARIFICATION**: The `exceptions` parameter applies to the **CURRENT LEVEL**,
 * not the next level. The key is the entry delimiter, and the exceptions define when that
 * entry delimiter (and its corresponding exit) should be ignored at the current parsing level.
 *
 * **Examples:**
 *
 * ```ts
 * // Simple (backward compatible)
 * type Simple = { "(": ")" }
 *
 * // Hierarchical - empty config inside quotes (shallow nesting)
 * type Shallow = { '"': ['"', {}] }
 *
 * // Hierarchical - different tokens at different levels
 * type Multi = { "(": [")", { "[": "]" }] }
 *
 * // Hierarchical with exceptions - ignore `>` when preceded by `=`
 * type ArrowSafe = { "<": [">", {}, { exit: { ignorePrecededBy: ["="] } }] }
 * ```
 */
export type NestingKeyValue = Record<
    string,
    | string
    | NestingKeyValueConfig
>;

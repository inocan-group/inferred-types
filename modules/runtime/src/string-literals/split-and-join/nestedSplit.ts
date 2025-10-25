import type {
    DefaultNesting,
    AsNestingConfig,
    NestedSplit,
    NestedSplitPolicy,
    Nesting,
    KnownNestingConfig,
    NestingKeyValue
} from "inferred-types/types";
import {
    BRACKET_NESTING,
    Never,
    QUOTE_NESTING,
    SHALLOW_BRACKET_NESTING,
    SHALLOW_QUOTE_NESTING,
    SHALLOW_BRACKET_AND_QUOTE_NESTING
} from "inferred-types/constants";
import {
    afterFirst,
    asArray,
    asChars,
    err,
    isArray,
    isNestingEndMatch,
    isNestingKeyValue,
    isNestingStart,
    isNestingTuple,
    isString,
    mutable,
    toStringLiteral
} from "inferred-types/runtime";

/**
 * **getNextLevelConfig** - Runtime helper for hierarchical nesting
 *
 * Extracts the nesting configuration to use inside a nesting level that
 * starts with `startChar`.
 *
 * - For simple configs (string values): Returns the same config
 * - For hierarchical configs ([exit, nextLevel]): Extracts nextLevel
 * - If character is not in config: Returns the same config
 */
function getNextLevelConfig(startChar: string, nesting: Nesting): Nesting {
    if (isNestingKeyValue(nesting)) {
        const value = (nesting as Record<string, unknown>)[startChar];

        // Check if it's a hierarchical tuple [exit, nextLevel]
        if (Array.isArray(value) && value.length === 2) {
            return value[1] as Nesting;
        }

        // Simple form or character not in config - return same config
        return nesting;
    }

    // NestingTuple - check for optional third element
    if (Array.isArray(nesting) && nesting.length === 3) {
        return nesting[2] as Nesting;
    }

    // Simple tuple - return same config
    return nesting;
}

/**
 * **getParentConfig** - Reconstructs the config that was active at the parent level
 *
 * Given a stack of entry characters and the root nesting config, this reconstructs
 * the nesting config that was active when the last entry character was seen.
 *
 * This is needed for `isNestingEndMatch` to look up the correct exit token.
 */
function getParentConfig(stack: readonly string[], rootNesting: Nesting): Nesting {
    if (stack.length <= 1) {
        // Parent is root level
        return rootNesting;
    }

    // Reconstruct parent config by applying getNextLevelConfig for each level
    let config = rootNesting;
    for (let i = 0; i < stack.length - 1; i++) {
        config = getNextLevelConfig(stack[i], config);
    }
    return config;
}

function splitProcessorMultiChar<
    TContent extends string,
    TSplit extends string,
    TNesting extends Nesting,
    TPolicy extends NestedSplitPolicy
>(
    content: TContent,
    split: TSplit,
    currentNesting: TNesting,
    policy: TPolicy,
    stack: readonly string[] = [],
    waiting: string = "",
    result: string[] = [],
    lastWasSplit: boolean = false,
    rootNesting: Nesting = currentNesting
): string[] | Error {
    // Base case: no more characters
    if (content === "") {
        if (stack.length > 0) {
            return err(
                `unbalanced/nested-split`,
                `The nesting stack was unbalanced, so the nested split can not be completed!`,
                { stack: toStringLiteral(stack) }
            );
        }

        if (lastWasSplit) {
            return waiting === "" ? [...result, ""] : [...result, waiting, ""];
        }

        return waiting === "" ? result : [...result, waiting];
    }

    const currentChar = content[0];
    const remainingContent = content.slice(1);

    // Check if we're at base level (no nesting)
    if (stack.length === 0) {
        // Check if content starts with split pattern
        if (content.startsWith(split)) {
            const afterSplit = content.slice(split.length);
            let newWaiting = "";
            let newResult = [...result];

            switch (policy) {
                case "omit":
                    newResult.push(waiting);
                    break;
                case "inline":
                    newResult.push(waiting, split);
                    break;
                case "before":
                    newWaiting = split;
                    if (waiting === "" && result.length === 0) {
                        newResult = [];
                    }
                    else {
                        newResult.push(waiting);
                    }
                    break;
                case "after":
                    newResult.push(`${waiting}${split}`);
                    break;
            }

            return splitProcessorMultiChar(
                afterSplit,
                split,
                currentNesting,
                policy,
                stack,
                newWaiting,
                newResult,
                true,
                rootNesting
            );
        }

        // Check if current character starts nesting
        if (isNestingStart(currentChar, currentNesting)) {
            const nextLevelConfig = getNextLevelConfig(currentChar, currentNesting);

            return splitProcessorMultiChar(
                remainingContent,
                split,
                nextLevelConfig as TNesting,
                policy,
                [...stack, currentChar],
                `${waiting}${currentChar}`,
                result,
                false,
                rootNesting
            );
        }

        // Regular character at base level
        return splitProcessorMultiChar(
            remainingContent,
            split,
            currentNesting,
            policy,
            stack,
            `${waiting}${currentChar}`,
            result,
            false,
            rootNesting
        );
    }

    // We're inside nesting
    // Check if current character ends nesting
    if (isNestingEndMatch(currentChar, stack, getParentConfig(stack, rootNesting))) {
        const newStack = [...stack].slice(0, -1);

        // Determine parent config
        const parentConfig = newStack.length === 0
            ? rootNesting // Back to root level
            : getNextLevelConfig(newStack[newStack.length - 1], rootNesting); // Parent's next-level config

        return splitProcessorMultiChar(
            remainingContent,
            split,
            parentConfig as TNesting,
            policy,
            newStack,
            `${waiting}${currentChar}`,
            result,
            false,
            rootNesting
        );
    }

    // Check if current character starts new nesting
    if (isNestingStart(currentChar, currentNesting)) {
        const nextLevelConfig = getNextLevelConfig(currentChar, currentNesting);

        return splitProcessorMultiChar(
            remainingContent,
            split,
            nextLevelConfig as TNesting,
            policy,
            [...stack, currentChar],
            `${waiting}${currentChar}`,
            result,
            false,
            rootNesting
        );
    }

    // Regular character inside nesting
    return splitProcessorMultiChar(
        remainingContent,
        split,
        currentNesting,
        policy,
        stack,
        `${waiting}${currentChar}`,
        result,
        false,
        rootNesting
    );
}

function splitProcessorMultiple<
    TChars extends readonly string[],
    TSplit extends readonly string[],
    TNesting extends Nesting,
    TPolicy extends NestedSplitPolicy
>(
    chars: TChars,
    split: TSplit,
    currentNesting: TNesting,
    policy: TPolicy,
    stack: readonly string[] = [],
    waiting: string = "",
    result: string[] = [],
    rootNesting: Nesting = currentNesting
): string[] | Error {
    // Base case: no more characters
    if (chars.length === 0) {
        if (stack.length > 0) {
            return err(
                `unbalanced/nested-split`,
                `The nesting stack was unbalanced, so the nested split can not be completed!`,
                { stack: toStringLiteral(stack) }
            );
        }
        return [...result, waiting];
    }

    const currentChar = chars[0];
    const remainingChars = afterFirst(chars);

    // Check if current character is any of the split characters and we're at base level
    if (split.includes(currentChar) && stack.length === 0) {
        let newWaiting = "";
        let newResult = [...result];

        switch (policy) {
            case "omit":
                newResult.push(waiting);
                break;
            case "inline":
                newResult.push(waiting, currentChar);
                break;
            case "before":
                newWaiting = currentChar;
                if (waiting === "" && result.length === 0) {
                    newResult = [];
                }
                else {
                    newResult.push(waiting);
                }
                break;
            case "after":
                newResult.push(`${waiting}${currentChar}`);
                break;
        }

        return splitProcessorMultiple(
            remainingChars,
            split,
            currentNesting,
            policy,
            stack,
            newWaiting,
            newResult,
            rootNesting
        );
    }

    // Check if current character is nesting end match
    if (isNestingEndMatch(currentChar, stack, getParentConfig(stack, rootNesting))) {
        const newStack = [...stack].slice(0, -1);

        // Determine parent config
        const parentConfig = newStack.length === 0
            ? rootNesting // Back to root level
            : getNextLevelConfig(newStack[newStack.length - 1], rootNesting); // Parent's next-level config

        return splitProcessorMultiple(
            remainingChars,
            split,
            parentConfig as TNesting,
            policy,
            newStack,
            `${waiting}${currentChar}`,
            result,
            rootNesting
        );
    }

    // Check if current character is nesting start
    if (isNestingStart(currentChar, currentNesting)) {
        const newStack = [...stack, currentChar];
        const nextLevelConfig = getNextLevelConfig(currentChar, currentNesting);

        return splitProcessorMultiple(
            remainingChars,
            split,
            nextLevelConfig as TNesting,
            policy,
            newStack,
            `${waiting}${currentChar}`,
            result,
            rootNesting
        );
    }

    // Regular character, continue
    return splitProcessorMultiple(
        remainingChars,
        split,
        currentNesting,
        policy,
        stack,
        `${waiting}${currentChar}`,
        result,
        rootNesting
    );
}

function splitProcessor<
    TChars extends readonly string[],
    TSplit extends string,
    TNesting extends Nesting,
    TPolicy extends NestedSplitPolicy
>(
    chars: TChars,
    split: TSplit,
    currentNesting: TNesting,
    policy: TPolicy,
    stack: readonly string[] = [],
    waiting: string = "",
    result: string[] = [],
    rootNesting: Nesting = currentNesting
): string[] | Error {
    // Base case: no more characters
    if (chars.length === 0) {
        if (stack.length > 0) {
            return err(
                `unbalanced/nested-split`,
                `The nesting stack was unbalanced, so the nested split can not be completed!`,
                { stack: toStringLiteral(stack) }
            );
        }
        return [...result, waiting];
    }

    const currentChar = chars[0];
    const remainingChars = afterFirst(chars);

    // Check if current character is split character and we're at base level
    if (currentChar === split && stack.length === 0) {
        let newWaiting = "";
        let newResult = [...result];

        switch (policy) {
            case "omit":
                newResult.push(waiting);
                break;
            case "inline":
                newResult.push(waiting, currentChar);
                break;
            case "before":
                newWaiting = currentChar;
                if (waiting === "" && result.length === 0) {
                    newResult = [];
                }
                else {
                    newResult.push(waiting);
                }
                break;
            case "after":
                newResult.push(`${waiting}${currentChar}`);
                break;
        }

        return splitProcessor(
            remainingChars,
            split,
            currentNesting,
            policy,
            stack,
            newWaiting,
            newResult,
            rootNesting
        );
    }

    // Check if current character is nesting end match
    if (isNestingEndMatch(currentChar, stack, getParentConfig(stack, rootNesting))) {
        const newStack = [...stack].slice(0, -1);

        // Determine parent config
        const parentConfig = newStack.length === 0
            ? rootNesting // Back to root level
            : getNextLevelConfig(newStack[newStack.length - 1], rootNesting); // Parent's next-level config

        return splitProcessor(
            remainingChars,
            split,
            parentConfig as TNesting,
            policy,
            newStack,
            `${waiting}${currentChar}`,
            result,
            rootNesting
        );
    }

    // Check if current character is nesting start
    if (isNestingStart(currentChar, currentNesting)) {
        const newStack = [...stack, currentChar];
        const nextLevelConfig = getNextLevelConfig(currentChar, currentNesting);

        return splitProcessor(
            remainingChars,
            split,
            nextLevelConfig as TNesting,
            policy,
            newStack,
            `${waiting}${currentChar}`,
            result,
            rootNesting
        );
    }

    // Regular character, continue
    return splitProcessor(
        remainingChars,
        split,
        currentNesting,
        policy,
        stack,
        `${waiting}${currentChar}`,
        result,
        rootNesting
    );
}

/**
 * **nestedSplit**`(content, split, [nesting], [policy])`
 *
 * A run-time utility to split string's in a nested-aware manner.
 *
 * Now supports hierarchical nesting configurations where each level
 * can specify different tokens for the next level.
 *
 * **Related:** `NestedSplit<..>`, `split()`, `nested()`
 */
export function nestedSplit<
    const TContent extends string,
    const TSplit extends string | readonly string[],
    const TNesting extends Nesting | KnownNestingConfig = typeof BRACKET_NESTING,
    const TPolicy extends NestedSplitPolicy = "omit"
>(
    content: TContent,
    split: TSplit,
    nesting: TNesting = mutable(BRACKET_NESTING) as TNesting,
    policy: TPolicy = "omit" as TPolicy
) {
    const config: Nesting = isString(nesting)
        ? nesting === "default" || nesting === "brackets"
            ? BRACKET_NESTING
            : nesting === "quotes"
                ? QUOTE_NESTING
                : nesting === "brackets-and-quotes"
                    ? mutable({ ...BRACKET_NESTING, ...QUOTE_NESTING })
                    : nesting === "shallow-brackets"
                        ? mutable(SHALLOW_BRACKET_NESTING)
                        : nesting === "shallow-quotes"
                            ? mutable(SHALLOW_QUOTE_NESTING)
                            : nesting === "shallow-brackets-and-quotes"
                                ? mutable(SHALLOW_BRACKET_AND_QUOTE_NESTING)
                                : Never
        : nesting as Nesting;

    if (isNestingKeyValue(config) !== true && !isNestingTuple(config)) {
        return err(`invalid-nesting/nested-split`) as NestedSplit<
            TContent,
            TSplit,
            AsNestingConfig<TNesting>,
            TPolicy
        >;
    }

    if (isArray(split)) {
        // Handle array of split characters
        const result = splitProcessorMultiple(
            asChars(content),
            asArray(split) as string[],
            config,
            policy
        );
        return result as NestedSplit<
            TContent,
            TSplit,
            AsNestingConfig<TNesting>,
            TPolicy
        >;
    }

    // Handle single string split
    if (typeof split !== "string") {
        return err(
            `invalid-nesting/nested-split`,
            `The split parameter must be a string when not provided as an array!`,
            { split, content }
        ) as NestedSplit<
            TContent,
            TSplit,
            AsNestingConfig<TNesting>,
            TPolicy
        >;
    }

    // Use appropriate processor based on split length
    const result = split.length === 1
        ? splitProcessor(asChars(content), split, config, policy)
        : splitProcessorMultiChar(content, split, config, policy);

    return result as NestedSplit<
        TContent,
        TSplit,
        AsNestingConfig<TNesting>,
        TPolicy
    >;
}

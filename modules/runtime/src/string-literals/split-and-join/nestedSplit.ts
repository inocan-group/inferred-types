import type {
    DefaultNesting,
    FromNamedNestingConfig,
    NestedSplit,
    NestedSplitPolicy,
    Nesting,
    NestingConfig__Named
} from "inferred-types/types";
import { BRACKET_NESTING, Never, QUOTE_NESTING } from "inferred-types/constants";
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
 * Helper to determine if we're using quotes nesting mode.
 * In quotes mode, when already inside a quote, other quote types are treated as literals.
 */
function isQuotesMode(nesting: Nesting): boolean {
    // Check if nesting matches QUOTE_NESTING structure
    // QUOTE_NESTING has double quotes, single quotes, and backticks
    if (isNestingKeyValue(nesting)) {
        const entries = Object.entries(nesting);
        // Check if all entries are self-closing quote characters
        const allSelfClosing = entries.every(([k, v]) => k === v);
        const hasQuotes = entries.some(([k]) => k === '"' || k === "'" || k === '`');
        const result = allSelfClosing && hasQuotes;
        return result;
    }
    return false;
}

function splitProcessorMultiChar<
    TContent extends string,
    TSplit extends string,
    TNesting extends Nesting,
    TPolicy extends NestedSplitPolicy
>(
    content: TContent,
    split: TSplit,
    nesting: TNesting,
    policy: TPolicy,
    stack: readonly string[] = [],
    waiting: string = "",
    result: string[] = [],
    lastWasSplit: boolean = false,
    quotesMode: boolean = false
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
                nesting,
                policy,
                stack,
                newWaiting,
                newResult,
                true,
                quotesMode
            );
        }

        // Check if current character starts nesting
        if (isNestingStart(currentChar, nesting)) {
            return splitProcessorMultiChar(
                remainingContent,
                split,
                nesting,
                policy,
                [...stack, currentChar],
                `${waiting}${currentChar}`,
                result,
                false,
                quotesMode
            );
        }

        // Regular character at base level
        return splitProcessorMultiChar(
            remainingContent,
            split,
            nesting,
            policy,
            stack,
            `${waiting}${currentChar}`,
            result,
            false,
            quotesMode
        );
    }

    // We're inside nesting
    // Check if current character ends nesting
    if (isNestingEndMatch(currentChar, stack, nesting)) {
        const newStack = [...stack].slice(0, -1);
        return splitProcessorMultiChar(
            remainingContent,
            split,
            nesting,
            policy,
            newStack,
            `${waiting}${currentChar}`,
            result,
            false,
            quotesMode
        );
    }

    // Check if current character starts new nesting
    // In quotes mode, when already nested, don't start new nesting
    if (!quotesMode && isNestingStart(currentChar, nesting)) {
        return splitProcessorMultiChar(
            remainingContent,
            split,
            nesting,
            policy,
            [...stack, currentChar],
            `${waiting}${currentChar}`,
            result,
            false,
            quotesMode
        );
    }

    // Regular character inside nesting
    return splitProcessorMultiChar(
        remainingContent,
        split,
        nesting,
        policy,
        stack,
        `${waiting}${currentChar}`,
        result,
        false,
        quotesMode
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
    nesting: TNesting,
    policy: TPolicy,
    stack: readonly string[] = [],
    waiting: string = "",
    result: string[] = [],
    quotesMode: boolean = false
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
            nesting,
            policy,
            stack,
            newWaiting,
            newResult,
            quotesMode
        );
    }

    // Check if current character is nesting end match
    if (isNestingEndMatch(currentChar, stack, nesting)) {
        const newStack = [...stack].slice(0, -1);
        return splitProcessorMultiple(
            remainingChars,
            split,
            nesting,
            policy,
            newStack,
            `${waiting}${currentChar}`,
            result,
            quotesMode
        );
    }

    // Check if current character is nesting start
    // In quotes mode, don't start new nesting when already inside a quote
    if ((stack.length === 0 || !quotesMode) && isNestingStart(currentChar, nesting)) {
        const newStack = [...stack, currentChar];
        return splitProcessorMultiple(
            remainingChars,
            split,
            nesting,
            policy,
            newStack,
            `${waiting}${currentChar}`,
            result,
            quotesMode
        );
    }

    // Regular character, continue
    return splitProcessorMultiple(
        remainingChars,
        split,
        nesting,
        policy,
        stack,
        `${waiting}${currentChar}`,
        result,
        quotesMode
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
    nesting: TNesting,
    policy: TPolicy,
    stack: readonly string[] = [],
    waiting: string = "",
    result: string[] = [],
    quotesMode: boolean = false
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
            nesting,
            policy,
            stack,
            newWaiting,
            newResult,
            quotesMode
        );
    }

    // Check if current character is nesting end match
    if (isNestingEndMatch(currentChar, stack, nesting)) {
        const newStack = [...stack].slice(0, -1);
        return splitProcessor(
            remainingChars,
            split,
            nesting,
            policy,
            newStack,
            `${waiting}${currentChar}`,
            result,
            quotesMode
        );
    }

    // Check if current character is nesting start
    // In quotes mode, don't start new nesting when already inside a quote
    if ((stack.length === 0 || !quotesMode) && isNestingStart(currentChar, nesting)) {
        const newStack = [...stack, currentChar];
        return splitProcessor(
            remainingChars,
            split,
            nesting,
            policy,
            newStack,
            `${waiting}${currentChar}`,
            result,
            quotesMode
        );
    }

    // Regular character, continue
    return splitProcessor(
        remainingChars,
        split,
        nesting,
        policy,
        stack,
        `${waiting}${currentChar}`,
        result,
        quotesMode
    );
}

/**
 * **nestedSplit**`(content, split, [nesting], [policy])`
 *
 * A run-time utility to split string's in a nested-aware manner.
 *
 * **Related:** `NestedSplit<..>`, `split()`, `nested()`
 */
export function nestedSplit<
    const TContent extends string,
    const TSplit extends string | readonly string[],
    const TNesting extends Nesting | NestingConfig__Named = DefaultNesting,
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
                : Never
        : nesting as Nesting;

    if (isNestingKeyValue(config) !== true && isNestingTuple(config)) {
        return err(`invalid-nesting/nested-split`) as NestedSplit<
            TContent,
            TSplit,
            FromNamedNestingConfig<TNesting>,
            TPolicy
        >;
    }

    // Detect if we're using quotes mode
    const quotesMode = isQuotesMode(config);

    if (isArray(split)) {
        // Validate all split characters are single characters
        // for (const s of split) {
        //     if (typeof s !== 'string' || s.length !== 1) {
        //         return err(
        //             `invalid-nesting/nested-split`,
        //             `A tuple of strings were passed in to form a union type of characters which would provide the 'split', however, at least one of these were longer than a single character!`,
        //             { split: toStringLiteral(split), content }
        //         );
        //     }
        // }

        // Create a modified splitProcessor that handles multiple split characters
        const result = splitProcessorMultiple(
            asChars(content),
            asArray(split) as string[],
            config,
            policy,
            [],
            "",
            [],
            quotesMode
        );
        return result as NestedSplit<
            TContent,
            TSplit,
            FromNamedNestingConfig<TNesting>,
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
            FromNamedNestingConfig<TNesting>,
            TPolicy
        >;
    }

    // Use appropriate processor based on split length
    const result = split.length === 1
        ? splitProcessor(asChars(content), split, config, policy, [], "", [], quotesMode)
        : splitProcessorMultiChar(content, split, config, policy, [], "", [], false, quotesMode);

    return result as NestedSplit<
        TContent,
        TSplit,
        FromNamedNestingConfig<TNesting>,
        TPolicy
    >;
}

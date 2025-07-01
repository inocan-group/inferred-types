import type {
    DefaultNesting,
    FromNamedNestingConfig,
    NestedSplit,
    NestedSplitPolicy,
    Nesting,
    NestingConfig__Named
} from "inferred-types/types";
import { DEFAULT_NESTING, Never, QUOTE_NESTING } from "inferred-types/constants";
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
    result: string[] = []
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
            newResult
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
            result
        );
    }

    // Check if current character is nesting start
    if (isNestingStart(currentChar, nesting)) {
        const newStack = [...stack, currentChar];
        return splitProcessorMultiple(
            remainingChars,
            split,
            nesting,
            policy,
            newStack,
            `${waiting}${currentChar}`,
            result
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
        result
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
    result: string[] = []
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
            newResult
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
            result
        );
    }

    // Check if current character is nesting start
    if (isNestingStart(currentChar, nesting)) {
        const newStack = [...stack, currentChar];
        return splitProcessor(
            remainingChars,
            split,
            nesting,
            policy,
            newStack,
            `${waiting}${currentChar}`,
            result
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
        result
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
    nesting: TNesting = mutable(DEFAULT_NESTING) as TNesting,
    policy: TPolicy = "omit" as TPolicy
) {
    const config: Nesting = isString(nesting)
        ? nesting === "default" || nesting === "brackets"
            ? DEFAULT_NESTING
            : nesting === "quotes"
                ? QUOTE_NESTING
                : Never
        : nesting as Nesting;

    if (isNestingKeyValue(config) != true && isNestingTuple(config)) {
        return err(`invalid-nesting/nested-split`) as NestedSplit<
            TContent,
            TSplit,
            FromNamedNestingConfig<TNesting>,
            TPolicy
        >;
    }

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
            policy
        );
        return result as NestedSplit<
            TContent,
            TSplit,
            FromNamedNestingConfig<TNesting>,
            TPolicy
        >;
    }

    // Handle single string split
    if (typeof split !== "string" || split.length !== 1) {
        return err(
            `invalid-nesting/nested-split`,
            `A string of more than one character was provided as the 'split' character; this is not allowed!`,
            { split, content }
        ) as NestedSplit<
            TContent,
            TSplit,
            FromNamedNestingConfig<TNesting>,
            TPolicy
        >;
    }

    const result = splitProcessor(
        asChars(content),
        split,
        config,
        policy
    );

    return result as NestedSplit<
        TContent,
        TSplit,
        FromNamedNestingConfig<TNesting>,
        TPolicy
    >;
}

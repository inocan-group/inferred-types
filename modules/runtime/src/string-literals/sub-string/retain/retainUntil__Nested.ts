import type {
    As,
    BracketNesting,
    Fallback,
    AsNestingConfig,
    Nesting,
    RetainUntil__Nested,
    RetainUntil__NestedOptions
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
    isNestingEndMatch,
    isNestingStart,
    isNestingTuple,
    isNumber,
    isString,
    toStringLiteral,
} from "inferred-types/runtime";
import { TimerOptions } from "timers";

/**
 * **getNextLevelConfig** - Runtime helper for hierarchical nesting
 *
 * Extracts the nesting configuration to use inside a nesting level that
 * starts with `startChar`.
 */
function getNextLevelConfig(startChar: string, nesting: Nesting): Nesting {
    // NestingKeyValue - check if hierarchical tuple
    if (typeof nesting === "object" && !Array.isArray(nesting)) {
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

function findIdx<
    TChars extends readonly string[],
    TFind extends string | readonly string[],
    TNesting extends Nesting,
>(
    chars: TChars,
    find: TFind,
    currentNesting: TNesting,
    stack: readonly string[] = [],
    result: string = "",
    idx: number = 0,
    rootNesting: Nesting = currentNesting
) {
    const f = asArray(find) as string[];

    if (chars.length === 0) {
        if (stack.length > 0) {
            return err(
                `unbalanced/retainUntil__Nested`,
                `The characters passed into retainUntil_Nested were unbalanced in the nesting!`,
                { find, stack: toStringLiteral(stack), content: result }
            );
        }
        else {
            return err(
                `not-found/retainUntil__Nested`,
                `The characters passed into retainUntil_Nested had a balanced nesting but the character '${find}' was never found at the root of the nesting stack!`,
                { find, content: result }
            );
        }
    }

    if (f.includes(chars[0]) && stack.length === 0) {
        return idx;
    }

    if (isNestingEndMatch(chars[0], stack, getParentConfig(stack, rootNesting)) === true) {
        const newStack = [...stack].slice(0, -1);

        // Special check: if this character ends nesting AND is our target AND stack becomes empty
        if (chars[0] === find && newStack.length === 0) {
            return idx;
        }

        // Determine parent config
        const parentConfig = newStack.length === 0
            ? rootNesting // Back to root level
            : getNextLevelConfig(newStack[newStack.length - 1], rootNesting); // Parent's next-level config

        return findIdx(
            afterFirst(chars),
            find,
            parentConfig as TNesting,
            newStack,
            `${result}${chars[0]}`,
            idx + 1,
            rootNesting
        );
    }
    else if (isNestingStart(chars[0], currentNesting) === true) {
        // Special handling for NestingTuple: only allow stack depth of 1
        const shouldLimitStack = isNestingTuple(currentNesting) && stack.length > 0;
        const nextLevelConfig = getNextLevelConfig(chars[0], currentNesting);

        return findIdx(
            afterFirst(chars),
            find,
            nextLevelConfig as TNesting,
            shouldLimitStack ? stack : [...stack, chars[0]],
            `${result}${chars[0]}`,
            idx + 1,
            rootNesting
        );
    }
    else {
        // Regular character, continue
        return findIdx(
            afterFirst(chars),
            find,
            currentNesting,
            stack,
            `${result}${chars[0]}`,
            idx + 1,
            rootNesting
        );
    }
}



/**
 * **retainUntil__Nested**(str, find, [incl], [nesting])
 *
 * Returns a sub-string of `str`, terminating with `find` character
 * which exists at the base of the nesting stack.
 *
 * - if the find character is _not found_ at the base of the nesting
 * stack an error will be returned.
 * - **NEW**: Supports hierarchical nesting configurations where each
 * level can specify different tokens for the next level
 */
export function retainUntil__Nested<
    const TStr extends string,
    const TFind extends string | readonly string[],
    const TOpt extends RetainUntil__NestedOptions = {include: true, config: "brackets"},
    const TInclude extends boolean = As<Fallback<TOpt["include"], true>, boolean>,
    const TNesting extends Nesting  = As<Fallback<TOpt["config"], BracketNesting>, Nesting>
>(
    str: TStr,
    find: TFind,
    opt: TOpt = { include: true, config: "brackets"} as TOpt
) {

    const config: Nesting = isString(opt.config)
        ? opt.config === "default" || opt.config === "brackets"
            ? BRACKET_NESTING
        : opt.config === "quotes"
            ? QUOTE_NESTING
        : opt.config === "shallow-brackets"
            ? SHALLOW_BRACKET_NESTING
        : opt.config === "shallow-quotes"
            ? SHALLOW_QUOTE_NESTING
        : opt.config === "shallow-brackets-and-quotes"
            ? SHALLOW_BRACKET_AND_QUOTE_NESTING
        : opt.config === "brackets-and-quotes"
            ? { ...BRACKET_NESTING, ...QUOTE_NESTING }
        : Never
    : opt.config as Nesting;

    const idx = findIdx(asChars(str), find, config);

    type Rtn = TFind extends readonly string[]
        ? AsNestingConfig<TNesting> extends infer NestingConfig extends Nesting
            ? RetainUntil__Nested<
                TStr,
                TFind[number],
                { include: TInclude, config: NestingConfig}
            >
            : never
        : TFind extends string
            ? AsNestingConfig<TNesting> extends infer NestingConfig extends Nesting
                ? RetainUntil__Nested<
                    TStr,
                    TFind,
                    { include: TInclude, config: NestingConfig}
                >
                : never
    : never;

    if (isNumber(idx)) {
        const endIdx = idx ? idx + 1 : idx;
        return str.slice(0, endIdx) as Rtn
    }
    else {
        return idx as Rtn
    }
}



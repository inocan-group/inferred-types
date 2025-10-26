import type { Nesting } from "inferred-types/types";
import {
    isNestingEnd,
    isNestingKeyValue,
    isNestingTuple,
    isUndefined,
    last
} from "inferred-types/runtime";

export function isNestingEndMatch<
    TChar extends string,
    TStack extends readonly string[],
    TNesting extends Nesting
>(
    char: TChar,
    stack: TStack,
    nesting: TNesting
) {
    if (isNestingEnd(char, nesting) !== true) {
        return false;
    }
    else if (isNestingKeyValue(nesting)) {
        const stackTop = last(stack);
        if (!stackTop) {
            return false;
        }

        // Get the value for the stack top (entry character)
        const nestingValue = (nesting as Record<string, unknown>)[stackTop];

        // Handle hierarchical form: [exit, nextLevel]
        if (Array.isArray(nestingValue) && nestingValue.length === 2) {
            const exitToken = nestingValue[0] as string;
            return char === exitToken;
        }

        // Handle simple form: string
        if (typeof nestingValue === "string") {
            return char === nestingValue;
        }

        return false;
    }
    else if (isNestingTuple(nesting)) {
        const [start, end] = nesting;
        if (isUndefined(end)) {
            return !start.includes(char);
        }
        else {
            return !!end.includes(char);
        }
    }

    return false;
}

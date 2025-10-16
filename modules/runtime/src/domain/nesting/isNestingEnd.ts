import type { Nesting } from "inferred-types/types";
import { err, isNestingKeyValue, isNestingTuple } from "inferred-types/runtime";

export function isNestingEnd<
    TChar extends string,
    TNesting extends Nesting
>(
    char: TChar,
    nesting: TNesting
) {
    if (isNestingTuple(nesting)) {
        const [start, end] = nesting;
        if (end) {
            return end.includes(char);
        }
        else {
            // When end is undefined, any non-start character ends the nesting
            return !start.includes(char);
        }
    }
    else if (isNestingKeyValue(nesting)) {
        // Extract exit tokens from values (handles both simple and hierarchical forms)
        const exitTokens: string[] = [];
        for (const value of Object.values(nesting)) {
            if (Array.isArray(value) && value.length === 2) {
                // Hierarchical form: [exit, nextLevel]
                exitTokens.push(value[0] as string);
            } else if (typeof value === "string") {
                // Simple form: string
                exitTokens.push(value);
            }
        }
        return exitTokens.includes(char);
    }
    else {
        return err(
            `invalid-type/nesting`,
            `The isNestingEnd('${char}', nesting) function received an invalid nesting type. Remember that start and end characters MUST be single length characters`,
            { nesting, char }
        );
    }
}

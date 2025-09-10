import type { IT_Token, IT_TakeOutcome, IT_TakeKind } from "inferred-types/types";
import { isErr, err } from "inferred-types/runtime";
import { it_takeArray } from "./take/it_takeArray";
import { it_takeAtomic } from "./take/it_takeAtomic";
import { it_takeStringLiteral } from "./take/it_takeStringLiteral";
import { it_takeNumericLiteral } from "./take/it_takeNumericLiteral";
import { it_takeGroup } from "./take/it_takeGroup";
import { it_takeUnion } from "./take/it_takeUnion";
import { it_takeIntersection } from "./take/it_takeIntersection";

/**
 * **getInputToken**`(token)`
 *
 * Main orchestrator function that converts input tokens into IT_Token structures.
 * This is the runtime equivalent of the type-level GetInputToken<T> utility.
 * 
 * The function tries different "take" functions in order of priority until
 * one successfully parses the token or all fail.
 */
export function getInputToken<T extends string>(token: T): IT_TakeOutcome {
    const parse = token.trim();
    
if (!parse) {
        return err("malformed-token/empty", "Empty token provided");
    }
    
    // Define the order of take functions to try
    const takeFunctions = [
        it_takeArray,
        it_takeGroup,
        it_takeUnion,
        it_takeIntersection,
        it_takeStringLiteral,
        it_takeNumericLiteral,
        it_takeAtomic,
        // TODO: Add more take functions as they are implemented:
        // it_takeKvObject,
        // it_takeFunction,
        // it_takeGenerator,
        // it_takeSet,
        // it_takeLiteralArray,
        // it_takeObjectLiteral,
    ];
    
    // Try each take function in order
    for (const takeFn of takeFunctions) {
        const result = takeFn(parse);
        
        // If we get a malformed-token error, stop immediately
        if (isErr(result, "malformed-token")) {
            return result;
        }
        
        // If we get a successful result, return it
        if (!isErr(result)) {
            return result;
        }
        
        // If it's a wrong-handler error, continue to the next function
    }
    
    // If no take function could handle the token
    return err("unparsed", `No handler found for token: ${token}`);
}

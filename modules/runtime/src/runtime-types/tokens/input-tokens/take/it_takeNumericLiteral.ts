import { err } from "inferred-types/runtime";

/**
 * **it_takeNumericLiteral**`(parseStr)`
 *
 * Tries to take numeric literals off the head of the string token.
 *
 * Handles:
 * - `42` - direct numeric literals
 * - `Number(42)` - Number constructor calls
 */
export function it_takeNumericLiteral<T extends string>(parseStr: T) {
    const parse = parseStr.trim();

    // Pattern 1: Direct numeric literals: 42, 3.14, -5, etc.
    const numericMatch = parse.match(/^(-?\d+(?:\.\d*)?)(.*)$/);
    if (numericMatch) {
        const [, numStr, rest] = numericMatch;
        const num = Number(numStr);

        // Validate that it's actually a valid number
        if (Number.isNaN(num)) {
            return err("malformed-token/numeric-literal", `Invalid numeric literal: ${numStr}`);
        }

        return {
            __kind: "IT_Token" as const,
            kind: "literal" as const,
            token: numStr,
            type: num,
            rest: rest.trim()
        };
    }

    // Pattern 2: Number constructor: Number(42)
    const numberConstructorMatch = parse.match(/^Number\(([^)]*)\)(.*)$/);
    if (numberConstructorMatch) {
        const [, content, rest] = numberConstructorMatch;
        const num = Number(content);

        // Validate that it's actually a valid number
        if (Number.isNaN(num)) {
            return err("malformed-token/numeric-literal", `Invalid numeric literal in Number(): ${content}`);
        }

        return {
            __kind: "IT_Token" as const,
            kind: "literal" as const,
            token: `Number(${content})`,
            type: num,
            rest: rest.trim()
        };
    }

    return err("wrong-handler/numeric-literal");
}

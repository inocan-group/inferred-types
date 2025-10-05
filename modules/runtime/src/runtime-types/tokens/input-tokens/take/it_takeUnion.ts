import { err } from "inferred-types/runtime";

/**
 * **it_takeUnion**`(parseStr)`
 *
 * Tries to take union types off the head of the string token.
 *
 * Handles: `string | number`, `string | number | boolean`, etc.
 * Note: This function is typically called by the orchestrator when it encounters
 * a pipe character, not directly for parsing complete union expressions.
 */
export function it_takeUnion<T extends string>(parseStr: T) {
    const parse = parseStr.trim();

    // Union parsing is typically handled by the orchestrator when it sees "|"
    // This function is more for handling union patterns that might appear
    // at the start of a token string

    // Pattern: | type (continuation of a union)
    const unionContinuationMatch = parse.match(/^\|\s*([^|]+)(.*)$/);
    if (unionContinuationMatch) {
        const [, typePart, rest] = unionContinuationMatch;

        return {
            __kind: "IT_Token" as const,
            kind: "union" as const,
            token: `| ${typePart}`,
            type: null, // This will be populated by the orchestrator
            rest: rest.trim(),
            members: [] as any[] // This will be populated by the orchestrator
        };
    }

    // Pattern: type | type | type (complete union)
    const completeUnionMatch = parse.match(/^([^|]+)(\|[^|]+)+(.*)$/);
    if (completeUnionMatch) {
        const [, , , rest] = completeUnionMatch;

        // Extract all union members
        const members = parse.split(/\s*\|\s*/).filter(m => m.trim());

        return {
            __kind: "IT_Token" as const,
            kind: "union" as const,
            token: parse,
            type: null, // This will be populated by the orchestrator
            rest: rest.trim(),
            members: members.map(m => ({ type: m.trim() }))
        };
    }

    return err("wrong-handler/union");
}

import { err } from 'inferred-types/runtime';

/**
 * **it_takeGroup**`(parseStr)`
 *
 * Tries to take parenthesized expressions off the head of the string token.
 * 
 * Handles: `(string | number)`, `(string)`, etc.
 */
export function it_takeGroup<T extends string>(parseStr: T) {
    const parse = parseStr.trim();
    
    // Pattern: (content) where content can be any valid type expression
    const groupMatch = parse.match(/^\(([^)]*)\)(.*)$/);
    if (!groupMatch) {
        return err("wrong-handler/group");
    }
    
    const [, content, rest] = groupMatch;
    
    // Validate that content is not empty
    if (!content.trim()) {
        return err("malformed-token/group", "Empty parentheses are not allowed");
    }
    
    // For now, we'll return a basic structure - the actual type parsing will be done by getInputToken
    return {
        __kind: "IT_Token" as const,
        kind: "group" as const,
        token: `(${content})`,
        type: null, // This will be populated by the orchestrator
        rest: rest.trim(),
        underlying: null as any // This will be populated by the orchestrator
    };
}
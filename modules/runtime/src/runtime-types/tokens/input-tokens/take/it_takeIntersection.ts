import { err } from 'inferred-types/runtime';

/**
 * **it_takeIntersection**`(parseStr)`
 *
 * Tries to take intersection types off the head of the string token.
 * 
 * Handles: `string & number`, `string & number & boolean`, etc.
 * Note: This function is typically called by the orchestrator when it encounters
 * an ampersand character, not directly for parsing complete intersection expressions.
 */
export function it_takeIntersection<T extends string>(parseStr: T) {
    const parse = parseStr.trim();
    
    // Intersection parsing is typically handled by the orchestrator when it sees "&"
    // This function is more for handling intersection patterns that might appear
    // at the start of a token string
    
    // Pattern: & type (continuation of an intersection)
    const intersectionContinuationMatch = parse.match(/^&\s*([^&]+)(.*)$/);
    if (intersectionContinuationMatch) {
        const [, typePart, rest] = intersectionContinuationMatch;
        
        return {
            __kind: "IT_Token" as const,
            kind: "intersection" as const,
            token: `& ${typePart}`,
            type: null, // This will be populated by the orchestrator
            rest: rest.trim(),
            members: [] as any[] // This will be populated by the orchestrator
        };
    }
    
    // Pattern: type & type & type (complete intersection)
    const completeIntersectionMatch = parse.match(/^([^&]+)(\s*&\s*[^&]+)+(.*)$/);
    if (completeIntersectionMatch) {
        const [, , , rest] = completeIntersectionMatch;
        
        // Extract all intersection members
        const members = parse.split(/\s*&\s*/).filter(m => m.trim());
        
        return {
            __kind: "IT_Token" as const,
            kind: "intersection" as const,
            token: parse,
            type: null, // This will be populated by the orchestrator
            rest: rest.trim(),
            members: members.map(m => ({ type: m.trim() }))
        };
    }
    
    return err("wrong-handler/intersection");
}
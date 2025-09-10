import { err } from 'inferred-types/runtime';

/**
 * **it_takeStringLiteral**`(parseStr)`
 *
 * Tries to take string literals off the head of the string token.
 * 
 * Handles:
 * - `"foo"` - double quoted strings
 * - `'foo'` - single quoted strings  
 * - `\`foo\`` - template literals
 * - `String(foo)` - String constructor calls
 */
export function it_takeStringLiteral<T extends string>(parseStr: T) {
    const parse = parseStr.trim();
    
    // Pattern 1: Double quoted strings: "foo"
    const doubleQuoteMatch = parse.match(/^"([^"]*)"(.*)$/);
    if (doubleQuoteMatch) {
        const [, content, rest] = doubleQuoteMatch;
        return {
            __kind: "IT_Token" as const,
            kind: "literal" as const,
            token: `"${content}"`,
            type: content,
            rest: rest.trim()
        };
    }
    
    // Pattern 2: Single quoted strings: 'foo'
    const singleQuoteMatch = parse.match(/^'([^']*)'(.*)$/);
    if (singleQuoteMatch) {
        const [, content, rest] = singleQuoteMatch;
        return {
            __kind: "IT_Token" as const,
            kind: "literal" as const,
            token: `'${content}'`,
            type: content,
            rest: rest.trim()
        };
    }
    
    // Pattern 3: Template literals: `foo`
    const templateMatch = parse.match(/^`([^`]*)`(.*)$/);
    if (templateMatch) {
        const [, content, rest] = templateMatch;
        return {
            __kind: "IT_Token" as const,
            kind: "literal" as const,
            token: `\`${content}\``,
            type: content,
            rest: rest.trim()
        };
    }
    
    // Pattern 4: String constructor: String(foo)
    const stringConstructorMatch = parse.match(/^String\(([^)]*)\)(.*)$/);
    if (stringConstructorMatch) {
        const [, content, rest] = stringConstructorMatch;
        return {
            __kind: "IT_Token" as const,
            kind: "literal" as const,
            token: `String(${content})`,
            type: content,
            rest: rest.trim()
        };
    }
    
    return err("wrong-handler/string-literal");
}
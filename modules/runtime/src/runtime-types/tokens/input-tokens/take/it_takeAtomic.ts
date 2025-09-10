import { err } from 'inferred-types/runtime';

const ATOMIC_TYPES = [
    'string', 'number', 'boolean', 'unknown', 'any', 'void', 'never',
    'undefined', 'null', 'object', 'symbol', 'bigint'
];

/**
 * **it_takeAtomic**`(parseStr)`
 *
 * Tries to take atomic TypeScript types off the head of the string token.
 * 
 * Handles: `string`, `number`, `boolean`, `unknown`, `any`, `void`, `never`,
 * `undefined`, `null`, `object`, `symbol`, `bigint`
 */
export function it_takeAtomic<T extends string>(parseStr: T) {
    const parse = parseStr.trim();
    
    // Find the first word boundary to extract the potential type name
    const match = parse.match(/^([a-zA-Z_][a-zA-Z0-9_]*)(.*)$/);
    
    if (!match) {
        return err("wrong-handler/atomic");
    }
    
    const [, typeName, rest] = match;
    
    if (!ATOMIC_TYPES.includes(typeName)) {
        return err("wrong-handler/atomic");
    }
    
    // Map string names to actual types or string representations
    let type: any;
    switch (typeName) {
        case 'string': type = String; break;
        case 'number': type = Number; break;
        case 'boolean': type = Boolean; break;
        case 'unknown': type = 'unknown'; break;
        case 'any': type = 'any'; break;
        case 'void': type = 'void'; break;
        case 'never': type = 'never'; break;
        case 'undefined': type = undefined; break;
        case 'null': type = null; break;
        case 'object': type = Object; break;
        case 'symbol': type = Symbol; break;
        case 'bigint': type = BigInt; break;
        default:
            return err("malformed-token/atomic", `Unknown atomic type: ${typeName}`);
    }
    
    return {
        __kind: "IT_Token" as const,
        kind: "atomic" as const,
        token: typeName,
        type,
        rest: rest.trim()
    };
}
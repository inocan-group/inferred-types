import type { TakeFunction, TakeResult } from "../types";
import type { RuntimeType } from "../runtime-types";
import { unset, OPERATORS, trimToken, extractBetweenDelimiters, splitRespectingNesting } from "../utils";
import { objectRuntimeType } from "../runtime-types/object";

// Parser interface to avoid circular imports
interface TokenParser {
  parse(token: string): RuntimeType;
}

// This will be set by the main parser
let parser: TokenParser | undefined;

export function setObjectParser(p: TokenParser) {
  parser = p;
}

/**
 * Take function for object { key: type, ... } tokens
 */
export const takeObject: TakeFunction = (token: string): TakeResult | typeof unset => {
  const trimmed = trimToken(token);
  
  if (!trimmed.startsWith(OPERATORS.OBJECT_START)) {
    return unset;
  }
  
  const extracted = extractBetweenDelimiters(trimmed, OPERATORS.OBJECT_START, OPERATORS.OBJECT_END);
  if (!extracted) {
    return unset;
  }
  
  // Parse properties
  const content = extracted.content.trim();
  if (!content) {
    // Empty object
    return {
      type: objectRuntimeType.create({}),
      remaining: extracted.remaining
    };
  }
  
  const properties: Record<string, any> = {};
  const requiredKeys: string[] = [];
  const optionalKeys: string[] = [];
  
  // Split by commas, respecting nesting
  const parts = splitRespectingNesting(content, OPERATORS.SEPARATOR);
  
  try {
    for (const part of parts) {
      const trimmedPart = part.trim();
      
      // Find the colon separator
      const colonIndex = findColonAtLevel(trimmedPart);
      if (colonIndex === -1) {
        return unset;
      }
      
      const keyPart = trimmedPart.slice(0, colonIndex).trim();
      const typePart = trimmedPart.slice(colonIndex + 1).trim();
      
      // Check if key is optional (ends with ?)
      let key = keyPart;
      let isOptional = false;
      
      if (key.endsWith('?')) {
        key = key.slice(0, -1).trim();
        isOptional = true;
      }
      
      // Parse the type
      if (!parser) throw new Error("Parser not initialized");
      const propertyType = parser.parse(typePart);
      
      properties[key] = propertyType;
      if (isOptional) {
        optionalKeys.push(key);
      } else {
        requiredKeys.push(key);
      }
    }
  } catch {
    return unset;
  }
  
  return {
    type: objectRuntimeType.create(properties, requiredKeys, optionalKeys),
    remaining: extracted.remaining
  };
};

/**
 * Find colon separator at the top level (not inside nested structures)
 */
function findColonAtLevel(str: string): number {
  let level = 0;
  let inString = false;
  let stringChar = '';
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const prevChar = str[i - 1];
    
    // Handle string boundaries
    if ((char === '"' || char === "'") && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = '';
      }
    }
    
    if (inString) continue;
    
    // Handle nesting level
    if (char === '(' || char === '[' || char === '{' || char === '<') {
      level++;
    } else if (char === ')' || char === ']' || char === '}' || char === '>') {
      level--;
    } else if (char === ':' && level === 0) {
      return i;
    }
  }
  
  return -1;
}
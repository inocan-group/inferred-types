import type { TakeFunction, TakeResult, ParseContext } from "./types";
import type { RuntimeType } from "./runtime-types";
import { unset, trimToken, createParseError, PARSE_ERRORS } from "./utils";
import { takeAtomic } from "./take-functions/atomic";
import { takeLiteral } from "./take-functions/literal";
import { takeArray, takeSet, takeMap, takeWeakMap, takeRecord, setContainerParser } from "./take-functions/containers";
import { takeObject, setObjectParser } from "./take-functions/objects";
import { takeTuple, setTupleParser } from "./take-functions/tuples";

/**
 * Main parser function - converts input token string to RuntimeType
 */
// Parser interface will be set after function declarations
let parserInterface: { parse: (token: string) => RuntimeType };

export function parseInputToken(token: string): RuntimeType {
  // Initialize parser interface on first call
  if (!parserInterface) {
    parserInterface = {
      parse: (token: string): RuntimeType => parseInputToken(token)
    };
    setContainerParser(parserInterface);
    setObjectParser(parserInterface);
    setTupleParser(parserInterface);
  }

  const trimmedToken = trimToken(token);
  
  if (!trimmedToken) {
    throw createParseError(
      PARSE_ERRORS.INVALID_TOKEN,
      "Empty token provided",
      { token }
    );
  }
  
  const parseContext: ParseContext = {
    token: trimmedToken,
    position: 0,
    level: 0,
    stack: []
  };
  
  return parseTokenRecursive(parseContext);
}

/**
 * Recursive parser implementation
 */
function parseTokenRecursive(context: ParseContext): RuntimeType {
  const { token } = context;
  
  // Array of take functions to try in order
  const takeFunctions: TakeFunction[] = [
    takeAtomic,
    takeLiteral,
    takeArray,
    takeSet,
    takeMap,
    takeWeakMap,
    takeRecord,
    takeTuple,
    takeObject,
    // Additional take functions will be added in future phases
  ];
  
  // Try each take function until one succeeds
  for (const takeFunction of takeFunctions) {
    const result = takeFunction(token, context.level);
    
    if (result !== unset) {
      const { type, remaining } = result;
      
      // If there's no remaining token, we're done
      if (!trimToken(remaining)) {
        return type;
      }
      
      // If there's still content to parse, we need to handle it
      // For now, we'll throw an error - operator handling will be added in Phase 4
      throw createParseError(
        PARSE_ERRORS.INVALID_SYNTAX,
        `Unexpected content after parsing: "${remaining}"`,
        { 
          token,
          position: token.length - remaining.length,
          context: { parsedType: type.kind }
        }
      );
    }
  }
  
  // No take function could handle this token
  throw createParseError(
    PARSE_ERRORS.INVALID_TOKEN,
    `Unrecognized token: "${token}"`,
    { token, position: context.position }
  );
}
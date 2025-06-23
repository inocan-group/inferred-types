import type { TakeFunction, TakeResult } from "../types";
import type { RuntimeType } from "../runtime-types";
import { unset } from "inferred-types/runtime";
import { OPERATORS, trimToken, extractBetweenDelimiters, splitRespectingNesting } from "../utils";
import { containerRuntimeType } from "../runtime-types/container";

// Parser interface to avoid circular imports
interface TokenParser {
  parse(token: string): RuntimeType;
}

// This will be set by the main parser
let parser: TokenParser | undefined;

export function setTupleParser(p: TokenParser) {
  parser = p;
}

/**
 * Take function for tuple [T1, T2, T3] tokens
 */
export const takeTuple: TakeFunction = (token: string): TakeResult | typeof unset => {
  const trimmed = trimToken(token);
  
  if (!trimmed.startsWith(OPERATORS.TUPLE_START)) {
    return unset;
  }
  
  const extracted = extractBetweenDelimiters(trimmed, OPERATORS.TUPLE_START, OPERATORS.TUPLE_END);
  if (!extracted) {
    return unset;
  }
  
  // Parse element types separated by commas
  const content = extracted.content.trim();
  if (!content) {
    // Empty tuple
    return {
      type: containerRuntimeType.tuple([]),
      remaining: extracted.remaining
    };
  }
  
  const parts = splitRespectingNesting(content, OPERATORS.SEPARATOR);
  const elements = [];
  
  try {
    for (const part of parts) {
      if (!parser) throw new Error("Parser not initialized");
      const elementType = parser.parse(part.trim());
      elements.push(elementType);
    }
  } catch {
    return unset;
  }
  
  return {
    type: containerRuntimeType.tuple(elements),
    remaining: extracted.remaining
  };
};
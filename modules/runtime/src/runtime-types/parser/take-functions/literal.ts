import type { TakeFunction, TakeResult } from "../types";
import { unset } from "inferred-types/runtime";
import { LITERAL_PREFIXES, trimToken, extractBetweenDelimiters } from "../utils";
import { literalRuntimeType } from "../runtime-types/literal";

/**
 * Take function for literal types: String(value), Number(value), Boolean(value)
 */
export const takeLiteral: TakeFunction = (token: string): TakeResult | typeof unset => {
  const trimmed = trimToken(token);
  
  // Check for String(value) pattern
  if (trimmed.startsWith(LITERAL_PREFIXES.STRING)) {
    const extracted = extractBetweenDelimiters(trimmed, LITERAL_PREFIXES.STRING + "(", ")");
    if (extracted) {
      return {
        type: literalRuntimeType.string(extracted.content),
        remaining: extracted.remaining
      };
    }
  }
  
  // Check for Number(value) pattern
  if (trimmed.startsWith(LITERAL_PREFIXES.NUMBER)) {
    const extracted = extractBetweenDelimiters(trimmed, LITERAL_PREFIXES.NUMBER + "(", ")");
    if (extracted) {
      const numValue = parseFloat(extracted.content);
      if (!isNaN(numValue)) {
        return {
          type: literalRuntimeType.number(numValue),
          remaining: extracted.remaining
        };
      }
    }
  }
  
  // Check for Boolean(value) pattern
  if (trimmed.startsWith(LITERAL_PREFIXES.BOOLEAN)) {
    const extracted = extractBetweenDelimiters(trimmed, LITERAL_PREFIXES.BOOLEAN + "(", ")");
    if (extracted) {
      const content = extracted.content.toLowerCase();
      if (content === "true" || content === "false") {
        return {
          type: literalRuntimeType.boolean(content === "true"),
          remaining: extracted.remaining
        };
      }
    }
  }
  
  return unset;
};
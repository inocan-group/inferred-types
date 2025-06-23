import type { TakeFunction, TakeResult } from "../types";
import { unset } from "inferred-types/runtime";
import { ATOMIC_TOKENS, trimToken } from "../utils";
import { atomicRuntimeType } from "../runtime-types/atomic";

/**
 * Take function for atomic types: null, undefined, boolean, true, false, string, number, object, symbol
 */
export const takeAtomic: TakeFunction = (token: string): TakeResult | typeof unset => {
  const trimmed = trimToken(token);
  
  // Check for exact matches of atomic tokens
  if (trimmed === ATOMIC_TOKENS.NULL) {
    return {
      type: atomicRuntimeType.null(),
      remaining: ""
    };
  }
  
  if (trimmed === ATOMIC_TOKENS.UNDEFINED) {
    return {
      type: atomicRuntimeType.undefined(),
      remaining: ""
    };
  }
  
  if (trimmed === ATOMIC_TOKENS.TRUE) {
    return {
      type: atomicRuntimeType.true(),
      remaining: ""
    };
  }
  
  if (trimmed === ATOMIC_TOKENS.FALSE) {
    return {
      type: atomicRuntimeType.false(),
      remaining: ""
    };
  }
  
  if (trimmed === ATOMIC_TOKENS.BOOLEAN) {
    return {
      type: atomicRuntimeType.boolean(),
      remaining: ""
    };
  }
  
  if (trimmed === ATOMIC_TOKENS.STRING) {
    return {
      type: atomicRuntimeType.string(),
      remaining: ""
    };
  }
  
  if (trimmed === ATOMIC_TOKENS.NUMBER) {
    return {
      type: atomicRuntimeType.number(),
      remaining: ""
    };
  }
  
  if (trimmed === ATOMIC_TOKENS.OBJECT) {
    return {
      type: atomicRuntimeType.object(),
      remaining: ""
    };
  }
  
  if (trimmed === ATOMIC_TOKENS.SYMBOL) {
    return {
      type: atomicRuntimeType.symbol(),
      remaining: ""
    };
  }
  
  // Check for atomic tokens at the start of the string (for compound expressions)
  for (const [key, value] of Object.entries(ATOMIC_TOKENS)) {
    if (trimmed.startsWith(value)) {
      // Make sure it's a complete token (not part of a larger identifier)
      const nextChar = trimmed[value.length];
      if (!nextChar || /[\s|&(),<>\[\]{}]/.test(nextChar)) {
        const factory = atomicRuntimeType[key.toLowerCase() as keyof typeof atomicRuntimeType];
        if (factory) {
          return {
            type: factory(),
            remaining: trimmed.slice(value.length)
          };
        }
      }
    }
  }
  
  return unset;
};
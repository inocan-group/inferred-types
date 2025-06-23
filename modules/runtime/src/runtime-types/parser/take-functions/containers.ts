import type { TakeFunction, TakeResult } from "../types";
import type { RuntimeType } from "../runtime-types";
import { unset, CONTAINER_PREFIXES, OPERATORS, trimToken, extractBetweenDelimiters, splitRespectingNesting } from "../utils";
import { containerRuntimeType } from "../runtime-types/container";

// Parser interface to avoid circular imports
interface TokenParser {
  parse(token: string): RuntimeType;
}

// This will be set by the main parser
let parser: TokenParser | undefined;

export function setContainerParser(p: TokenParser) {
  parser = p;
}

/**
 * Take function for Array<T> tokens
 */
export const takeArray: TakeFunction = (token: string): TakeResult | typeof unset => {
  const trimmed = trimToken(token);
  
  
  if (!trimmed.startsWith(CONTAINER_PREFIXES.ARRAY)) {
    return unset;
  }
  
  const extracted = extractBetweenDelimiters(trimmed, CONTAINER_PREFIXES.ARRAY, OPERATORS.ARRAY_END);
  if (!extracted) {
    return unset;
  }
  
  let elementType;
  if (extracted.content.trim()) {
    try {
      if (!parser) throw new Error("Parser not initialized");
      elementType = parser.parse(extracted.content.trim());
    } catch {
      return unset;
    }
  }
  
  return {
    type: containerRuntimeType.array(elementType),
    remaining: extracted.remaining
  };
};

/**
 * Take function for Set<T> tokens
 */
export const takeSet: TakeFunction = (token: string): TakeResult | typeof unset => {
  const trimmed = trimToken(token);
  
  if (!trimmed.startsWith(CONTAINER_PREFIXES.SET)) {
    return unset;
  }
  
  const extracted = extractBetweenDelimiters(trimmed, CONTAINER_PREFIXES.SET, OPERATORS.ARRAY_END);
  if (!extracted) {
    return unset;
  }
  
  let elementType;
  if (extracted.content.trim()) {
    try {
      if (!parser) throw new Error("Parser not initialized");
      elementType = parser.parse(extracted.content.trim());
    } catch {
      return unset;
    }
  }
  
  return {
    type: containerRuntimeType.set(elementType),
    remaining: extracted.remaining
  };
};

/**
 * Take function for Map<K,V> tokens
 */
export const takeMap: TakeFunction = (token: string): TakeResult | typeof unset => {
  const trimmed = trimToken(token);
  
  if (!trimmed.startsWith(CONTAINER_PREFIXES.MAP)) {
    return unset;
  }
  
  const extracted = extractBetweenDelimiters(trimmed, CONTAINER_PREFIXES.MAP, OPERATORS.ARRAY_END);
  if (!extracted) {
    return unset;
  }
  
  // Parse key and value types separated by comma
  const parts = splitRespectingNesting(extracted.content, OPERATORS.SEPARATOR);
  if (parts.length !== 2) {
    return unset;
  }
  
  let keyType, valueType;
  try {
    if (!parser) throw new Error("Parser not initialized");
    keyType = parser.parse(parts[0].trim());
    valueType = parser.parse(parts[1].trim());
  } catch {
    return unset;
  }
  
  return {
    type: containerRuntimeType.map(keyType, valueType),
    remaining: extracted.remaining
  };
};

/**
 * Take function for WeakMap<K,V> tokens
 */
export const takeWeakMap: TakeFunction = (token: string): TakeResult | typeof unset => {
  const trimmed = trimToken(token);
  
  if (!trimmed.startsWith(CONTAINER_PREFIXES.WEAKMAP)) {
    return unset;
  }
  
  const extracted = extractBetweenDelimiters(trimmed, CONTAINER_PREFIXES.WEAKMAP, OPERATORS.ARRAY_END);
  if (!extracted) {
    return unset;
  }
  
  // Parse key and value types separated by comma
  const parts = splitRespectingNesting(extracted.content, OPERATORS.SEPARATOR);
  if (parts.length !== 2) {
    return unset;
  }
  
  let keyType, valueType;
  try {
    if (!parser) throw new Error("Parser not initialized");
    keyType = parser.parse(parts[0].trim());
    valueType = parser.parse(parts[1].trim());
  } catch {
    return unset;
  }
  
  return {
    type: containerRuntimeType.weakMap(keyType, valueType),
    remaining: extracted.remaining
  };
};

/**
 * Take function for Record<K,V> tokens
 */
export const takeRecord: TakeFunction = (token: string): TakeResult | typeof unset => {
  const trimmed = trimToken(token);
  
  if (!trimmed.startsWith(CONTAINER_PREFIXES.RECORD)) {
    return unset;
  }
  
  const extracted = extractBetweenDelimiters(trimmed, CONTAINER_PREFIXES.RECORD, OPERATORS.ARRAY_END);
  if (!extracted) {
    return unset;
  }
  
  // Parse key and value types separated by comma
  const parts = splitRespectingNesting(extracted.content, OPERATORS.SEPARATOR);
  if (parts.length !== 2) {
    return unset;
  }
  
  let keyType, valueType;
  try {
    if (!parser) throw new Error("Parser not initialized");
    keyType = parser.parse(parts[0].trim());
    valueType = parser.parse(parts[1].trim());
  } catch {
    return unset;
  }
  
  return {
    type: containerRuntimeType.record(keyType, valueType),
    remaining: extracted.remaining
  };
};
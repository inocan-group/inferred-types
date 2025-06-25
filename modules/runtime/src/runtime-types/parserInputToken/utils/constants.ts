import type { Narrowable } from "inferred-types/types";

/**
 * Import the standard unset value and type for internal use
 * Note: Not exported to avoid conflicts with main runtime exports
 */
import { unset } from "inferred-types/runtime";
import type { Unset } from "inferred-types/types";

/**
 * Parser operator symbols
 */
export const OPERATORS = {
  UNION: "|",
  INTERSECTION: "&",
  GROUP_START: "(",
  GROUP_END: ")",
  ARRAY_START: "Array<",
  ARRAY_END: ">",
  TUPLE_START: "[",
  TUPLE_END: "]",
  OBJECT_START: "{",
  OBJECT_END: "}",
  SET_START: "Set<",
  MAP_START: "Map<",
  WEAKMAP_START: "WeakMap<",
  RECORD_START: "Record<",
  FUNCTION_START: "fn",
  GENERATOR_START: "gen",
  LITERAL_START: "(",
  LITERAL_END: ")",
  SEPARATOR: ",",
  COLON: ":",
} as const;

/**
 * Atomic type tokens
 */
export const ATOMIC_TOKENS = {
  NULL: "null",
  UNDEFINED: "undefined",
  TRUE: "true",
  FALSE: "false",
  BOOLEAN: "boolean",
  STRING: "string",
  NUMBER: "number",
  OBJECT: "object",
  SYMBOL: "symbol",
} as const;

/**
 * Literal type prefixes
 */
export const LITERAL_PREFIXES = {
  STRING: "String",
  NUMBER: "Number", 
  BOOLEAN: "Boolean",
} as const;

/**
 * Container type prefixes
 */
export const CONTAINER_PREFIXES = {
  ARRAY: "Array<",
  SET: "Set<",
  MAP: "Map<",
  WEAKMAP: "WeakMap<",
  RECORD: "Record<",
} as const;

/**
 * Base narrowable constraint for runtime types
 */
export type NarrowableConstraint = Narrowable;
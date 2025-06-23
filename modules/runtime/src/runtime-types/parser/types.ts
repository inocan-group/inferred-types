import type { RuntimeType } from "./runtime-types";
import type { Unset } from "inferred-types/types";

/**
 * Result of a successful take function
 */
export interface TakeResult {
  type: RuntimeType;
  remaining: string;
}

/**
 * Take function signature - returns either a successful result or Unset
 */
export type TakeFunction = (token: string, level?: number) => TakeResult | Unset;

/**
 * Parser context for tracking state during parsing
 */
export interface ParseContext {
  token: string;
  position: number;
  level: number;
  stack: RuntimeType[];
}

/**
 * Parse level information for handling nested structures
 */
export interface ParseLevel {
  operator: "union" | "intersection" | "grouping" | null;
  startPos: number;
  types: RuntimeType[];
}
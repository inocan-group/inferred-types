import { IsValidDotPath } from "src/types";

/**
 * **IfValidDotPath**`<TContainer,TDotPath,IF,ELSE,[MAYBE]>`
 * 
 * Branching utility which is based on whether `TDotPath` is a valid dot path
 * for the container `TContainer`.
 * 
 * - you may state a `MAYBE` type -- which is mapped to when not enough information
 * exists in the design time environment and `IsValidDotPath` returns "boolean"; by default
 * this type is a union between `IF` and `ELSE`.
 */
export type IfValidDotPath<
  TContainer,
  TDotPath,
  IF,
  ELSE,
  MAYBE = IF | ELSE
> = IsValidDotPath<TContainer,TDotPath> extends true
  ? IF
  : IsValidDotPath<TContainer,TDotPath> extends false
    ? ELSE
    : MAYBE;

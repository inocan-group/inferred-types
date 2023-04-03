import { IsDotPath } from "../operators";

/**
 * **IfDotPath**`<TDotPath,IF,ELSE,[MAYBE]>`
 * 
 * Branching utility which is based on whether `TDotPath` is a valid dot path.
 * 
 * - you may state a `MAYBE` type -- which is mapped to when not enough information
 * exists in the design time environment and `IsDotPath` returns "boolean"; by default
 * this type is a union between `IF` and `ELSE`.
 * 
 * **Related:** `IfValidDotPath`
 */
export type IfDotPath<
  TDotPath,
  IF,
  ELSE,
  MAYBE = IF | ELSE
> = IsDotPath<TDotPath> extends true
  ? IF
  : IsDotPath<TDotPath> extends false
    ? ELSE
    : MAYBE;

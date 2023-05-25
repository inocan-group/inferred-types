import { IsErrorCondition, IfNever } from "src/types";


/**
 * **IfNotError**`<T,IF,[ELSE]>`
 * 
 * Branching utility which returns type `IF` when `T` is neither a _never_
 * value nor a `ErrorCondition`. Otherwise returns `ELSE`.
 * 
 * - type of `ELSE` is defaulted to `T` for convenience but can be set
 * to any type which is appropriate.
 * 
 * **Related:** `IfError`, `IfErrorCondition`
 */
export type IfNotError<T,IF,ELSE = T> = IsErrorCondition<T> extends false 
  ? IF
  : IfNever<T, IF, ELSE>;

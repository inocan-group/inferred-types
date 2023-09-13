import { IsErrorCondition , IfNever } from "../..";

/**
 * **IfError**`<T,IF,[ELSE]>`
 * 
 * Branching utility which returns type `IF` when `T` is either an 
 * `ErrorCondition` or the type of `never`. In all other cases the
 * type `ELSE` is returned.
 * 
 * - type of `ELSE` is defaulted to `T` for convenience but can be set
 * to any type which is appropriate.
 * 
 * **Related:** `IfNotError`, `IfErrorCondition`
 */
export type IfError<T,IF,ELSE = T> = IsErrorCondition<T> extends true 
  ? IF
  : IfNever<T, IF, ELSE>;

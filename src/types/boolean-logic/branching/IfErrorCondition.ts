import { IsErrorCondition } from "src/types";


/**
 * **IFErrorCondition**`<T,IF,[ELSE]>`
 * 
 * Branching utility which returns `IF` when `T` is an `ErrorCondition`, otherwise
 * it returns `ELSE`.
 * 
 * **Related:** `IfError`
 */
export type IfErrorCondition<T,IF,ELSE = T> = IsErrorCondition<T> extends true
  ? IF 
  : ELSE;

import { IsEmptyObject } from "src/types/index";

/**
 * **IfEmptyObject**`<T,IF,ELSE>`
 * 
 * Branching utility which returns type `IF` when `T` is an
 * empty object; otherwise returns `ELSE` type.
 */
export type IfEmptyObject<T,IF,ELSE> = IsEmptyObject<T> extends true 
  ? IF
  : ELSE;

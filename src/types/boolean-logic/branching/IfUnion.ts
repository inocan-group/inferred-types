import { IsUnion } from "src/types/index";

/**
 * **IfUnion**`<T,IF,ELSE>`
 * 
 * Type branching utility based on whether type `T` is a union type
 */
export type IfUnion<
  T,
  IF = true,
  ELSE = false
> = IsUnion<T> extends true ? IF : ELSE;

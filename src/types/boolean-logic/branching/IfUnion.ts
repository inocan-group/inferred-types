import { IsUnion } from "src/types/boolean-logic";

/**
 * **IfUnion**`<T,IF,ELSE>`
 * 
 * Type branching utility based on whether type `T` is a union type
 */
export type IfUnion<
  T,
  IF,
  ELSE
> = IsUnion<T> extends true ? IF : ELSE;

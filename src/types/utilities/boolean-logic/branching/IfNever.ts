import { IsNever } from "src/types";

/**
 * **IfNever**`<T,IsNever,NotNever>`
 * 
 * Type utility which transforms type `T` based on whether it extends the _never_
 * type.
 */
export type IfNever<
  T,
  IF,
  ELSE
> = IsNever<T> extends true ? IF : ELSE;

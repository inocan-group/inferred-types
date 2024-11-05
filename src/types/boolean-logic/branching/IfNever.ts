import { IsNever } from "inferred-types/dist/types/index";

/**
 * **IfNever**`<T,IsNever,NotNever>`
 *
 * Type utility which transforms type `T` based on whether it extends the _never_
 * type.
 */
export type IfNever<
  T,
  IF,
  ELSE = T
> = [IsNever<T>] extends [true] ? IF : ELSE;

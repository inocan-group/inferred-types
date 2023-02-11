import { Narrowable } from "../literals/Narrowable";
import { IsUnion } from "./IsUnion";

/**
 * **IfUnion**`<T,IF,ELSE>`
 * 
 * Type branching utility based on whether type `T` is a union type
 */
export type IfUnion<
  T,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsUnion<T> extends true ? IF : ELSE;

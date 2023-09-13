import { IsRef } from "../..";

/**
 * **IfRef**`<T,IF,ELSE,[MAYBE]>`
 * 
 * Conditional type utility that reacts to whether `T` _is_ or _is not_ a
 * VueJS `Ref` type.
 */
export type IfRef<
  T,
  IF,
  ELSE,
  MAYBE = IF | ELSE
> = IsRef<T> extends true ? IF : IsRef<T> extends false ? ELSE : MAYBE;

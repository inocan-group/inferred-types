import { IsVueRef } from "src/types/index";

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
> = IsVueRef<T> extends true ? IF : IsVueRef<T> extends false ? ELSE : MAYBE;

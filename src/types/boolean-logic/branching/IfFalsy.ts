import { If, IsEqual, IsFalsy } from "src/types/index";

/**
 * **IfFalsy**`<T,IF,ELSE,[MAYBE]>`
 * 
 * Type branching utility that branches based on whether `T` is
 * a _falsy_ value.
 */
export type IfFalsy<T,IF,ELSE,MAYBE = IF | ELSE> = //
If<
  IsEqual<IsFalsy<T>, true>,
  IF,
  If<
    IsEqual<IsFalsy<T>, false>,
    ELSE,
    MAYBE
  >
>

import { IfEqual , IsTruthy } from "src/types/boolean-logic";

/**
 * **IfFalsy**`<T,IF,ELSE,[MAYBE]>`
 * 
 * Type branching utility that branches based on whether `T` is
 * a _falsy_ value.
 */
export type IfFalsy<T,IF,ELSE,MAYBE = IF | ELSE> = //
IfEqual<
  IsTruthy<T>,false,IF, // falsy
  IfEqual<IsTruthy<T>,true, ELSE, // truthy 
  MAYBE
>>;

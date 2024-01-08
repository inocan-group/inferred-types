import { IsChar , IfFalse , IfTrue } from "../..";

/**
 * **IfChar**`<T,IF,ELSE,[MAYBE]>`
 * 
 * Branching utility which branches on whether `T` is a single character.
 * 
 * - by default `IF` will take on the value of `T`
 * - by default `ELSE` will take on the value of `never`
 */
export type IfChar<
  T,
  IF = T,
  ELSE = never,
  MAYBE = IF | ELSE
> = IfTrue<IsChar<T>, IF, IfFalse<IsChar<T>, ELSE, MAYBE>>;

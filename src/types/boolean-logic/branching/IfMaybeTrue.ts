import { IfBoolean , IfFalse , IfTrue } from "src/types/boolean-logic";

/**
 * **IfMaybeTrue**`<T, IF, ELSE, MAYBE>`
 * 
 * Type utility which transforms the type based on `T`'s boolean state:
 * 
 * - `true` - converts to the `IF` type
 * - `false` - converts to the `ELSE` type
 * - `boolean` - converts to the `MAYBE` state (which is union of `IF` and `ELSE` by default)
 * - any other value converts to `never`
 */
export type IfMaybeTrue<
  T,
  IF,
  ELSE,
  MAYBE = IF | ELSE
> = IfTrue<
  T, IF, IfFalse<T, ELSE, IfBoolean<T, MAYBE, never>>
>;

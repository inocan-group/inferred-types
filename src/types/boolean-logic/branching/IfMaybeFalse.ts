import { IfTrue , IfFalse , IfBoolean } from "src/types/index";

/**
 * **IfSoftFalse**`<T, IF, ELSE, MAYBE, UNKNOWN>`
 * 
 * Type utility which transforms the type based on `T`'s boolean state:
 * 
 * - `false` - converts to the `IF` type
 * - `true` - converts to the `ELSE` type
 * - `boolean` - converts to the `MAYBE` state (which is union of `IF` and `ELSE` by default)
 * - any other value converts to `never`
 */
export type IfMaybeFalse<
  T,
  IF,
  ELSE,
  MAYBE = IF | ELSE
> = IfFalse<
  T, IF, 
  IfTrue<T, ELSE, IfBoolean<T, MAYBE, never>>
>;

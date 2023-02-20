import { IsNever } from "src/types/boolean-logic";

/**
 * **IfNotNever**`<T,IF,ELSE>`
 * 
 * Boolean type test which tests whether `T` extends _never_.
 */
export type IfNotNever<
  T,
  IF = T,
  ELSE = never
> = IsNever<T> extends true ? ELSE : IF;

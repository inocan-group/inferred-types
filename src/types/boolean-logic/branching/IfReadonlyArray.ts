import { IsReadonlyArray } from "src/types/boolean-logic";

/**
 * **IfReadonlyArray**`<T, IF, ELSE>`
 *
 * Type utility which convert to type `IF` or `ELSE` based on whether `T` is a readonly array
 */
export type IfReadonlyArray<
  T,
  IF,
  ELSE
> = IsReadonlyArray<T> extends true ? IF : ELSE;

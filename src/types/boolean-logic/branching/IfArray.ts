import { IsArray } from "src/types/index";


/**
 * **IfArray**`<T, IF, ELSE>`
 *
 * Type utility which convert to type `IF` or `ELSE` based on whether `T` is an array.
 */
export type IfArray<T,
  IF = T & unknown[],
  ELSE = Exclude<T, unknown[]>
> = IsArray<T> extends true ? IF : ELSE;

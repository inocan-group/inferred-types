import { IsGreaterThan } from "src/types";

/**
 * **IfGreaterThan**`<A,B,IF,ELSE>`
 * 
 * Type branching utility based on whether `A` is 
 * _greater than_ `B`.
 */
export type IfGreaterThan<
  A extends number | `${number}`,
  B extends number | `${number}`,
  IF,
  ELSE
> = IsGreaterThan<A,B> extends true ? IF : ELSE;

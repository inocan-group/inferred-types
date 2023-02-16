import { IsEqual } from "src/types/boolean-logic";

/**
 * **NotEqual**`<A,B>`
 * 
 * Boolean utility to determine whether two values are **not** equal.
 */
export type NotEqual<
  A,
  B
> = IsEqual<A, B> extends true ? false : true;

import { IsEqual } from "inferred-types/dist/types/index";

/**
 * **NotEqual**`<A,B>`
 *
 * Boolean utility to determine whether two values are **not** equal.
 */
export type NotEqual<
  A,
  B
> = IsEqual<A, B> extends true ? false : true;

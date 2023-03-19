/**
 * **LeftRight**`<L,R>`
 * 
 * A tuple which has two possible states represented as `L`
 * and `R`.
 */
export type LeftRight<
  L = unknown,
  R = unknown
> = [kind: "LeftRight", left: L, right: R];

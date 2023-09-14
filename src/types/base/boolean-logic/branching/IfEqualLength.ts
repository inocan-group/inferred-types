import { ErrorCondition, OfSameLength, Tuple } from "src/types";

/**
 * **IfEqualLength**`<A,B,IF,ELSE,[ERR]>`
 * 
 * Branching utility which branches based on whether `A` and `B` are of equal length.
 */
export type IfEqualLength<
  A extends Tuple | string,
  B extends Tuple | string,
  IF,
  ELSE,
  ERR = OfSameLength<A,B>
> = OfSameLength<A,B> extends true
? IF
: OfSameLength<A,B> extends false 
? ELSE
: OfSameLength<A,B> extends ErrorCondition<string>
  ? ERR
  : never;

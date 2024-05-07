import { ErrorCondition, AreSameLength, Tuple } from "src/types/index";

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
  ERR = AreSameLength<A,B>
> = AreSameLength<A,B> extends true
? IF
: AreSameLength<A,B> extends false 
? ELSE
: AreSameLength<A,B> extends ErrorCondition<string>
  ? ERR
  : never;

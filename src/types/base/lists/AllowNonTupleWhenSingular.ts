import { ErrorCondition } from "src/types";

/**
 * **AllowNonTupleWhenSingular**`<TTuple>`
 * 
 * Converts `T` to being `T | T[0]` when the tuple's length
 * is 1. Otherwise keeps the type as `T`.
 * 
 * This type pairs well with the `AsArray` utility.
 */
export type AllowNonTupleWhenSingular<
  TTuple extends readonly unknown[]
> = TTuple["length"] extends 1
  ? TTuple[0] extends ErrorCondition
    ? TTuple[0] 
    : TTuple | TTuple[0]
  : TTuple;


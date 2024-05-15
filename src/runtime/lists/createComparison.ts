import { ComparatorOperation, Comparison, ParamsForComparison } from "src/types/boolean-logic";
import {  Narrowable } from "src/types/literals";

/**
 * **createComparison**(op, ...args)
 * 
 * Creates a _future_ comparison which can be used with the `filter`, `retain`, and
 * other runtime utilities.
 */
export const createComparison = <
  TOp extends ComparatorOperation,
  TArgs extends readonly Narrowable[]
>(op: TOp, ...args: TArgs & ParamsForComparison<TOp>) => {
  return [args[0],...args.slice(1)] as unknown as Comparison<TOp, typeof args>
}


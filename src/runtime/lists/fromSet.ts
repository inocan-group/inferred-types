import { KV } from "../../types/type-conversion";
import { ifKvTupleArray } from "../boolean-logic/ifKvTupleArray";
import { fromKv } from "../type-conversion/fromKv";


/**
 * **fromSet**(resultSet)
 * 
 * Evaluates the _result set_ passed in and converts it to an
 * object if it detects the set to be an array of `KV`'s. In all
 * other cases it just returns the result set "as is".
 * 
 * **Related:** `toSet`
 */
export function fromSet<
  TSet extends readonly any[]
>(resultSet: TSet) {
  return ifKvTupleArray(
    resultSet,
    v1 => fromKv(v1 as TSet & readonly KV[]),
    v2 => v2
  );
}

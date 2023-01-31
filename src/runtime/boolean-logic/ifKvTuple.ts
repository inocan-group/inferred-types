import { KV, Narrowable } from "../../types";
import { isKvTuple } from "../type-guards";

/**
 * **ifKvTuple**(value,if_cb,not_cb)
 * 
 * Strongly typed boolean branching based on whether the _value_ is 
 * a KV or note.
 */
export function ifKvTuple<
  TValue,
  IF extends Narrowable,
  NOT extends Narrowable
>(
  value: TValue,
  if_cb: <T extends TValue & KV>(v: T) => IF,
  not_cb: <T extends Exclude<TValue, KV>>(v: T) => NOT
)  {
  return isKvTuple(value)
    ? if_cb(value as TValue & KV)
    : not_cb(value as Exclude<TValue, KV>);
}

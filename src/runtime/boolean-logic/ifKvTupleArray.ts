import { IfExtends } from "src/types";
import { Narrowable } from "src/types/literals";
import { KV } from "src/types/type-conversion";
import { isKvTupleArray } from "../type-guards";

export function ifKvTupleArray<
  TValue extends Narrowable | readonly Narrowable[],
  IF extends Narrowable,
  NOT extends Narrowable
>(
  value: TValue,
  if_cb: <T extends TValue & readonly KV[]>(v: T) => IF,
  not_cb: <T extends Exclude<TValue, readonly KV[]>>(v: T) => NOT
) {
  return (
    isKvTupleArray(value)
    ? if_cb(value as TValue & readonly KV[])
    : not_cb(value as Exclude<TValue, readonly KV[]> )
  ) as IfExtends<TValue, readonly KV[], true, false>;
}

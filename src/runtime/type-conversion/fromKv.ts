import { KV, SimplifyObject } from "src/types";
import { FromKV } from "types/type-conversion/FromKV";
import { RemoveIndex } from "types/type-conversion/RemoveIndex";

/**
 * **toKv**(obj)
 * 
 * Converts an object to a type strong array of `KV` values.
 * 
 * **Related**: `toKv`
 */
export const fromKv = <
  TKv extends readonly KV[]
>(kv: TKv) => {
  return [...kv].reduce(
    (acc, [_, k,v]) => {
      acc[k as any] = v;
      return acc;
    },
    {} as Record<any, any>
  ) as SimplifyObject<RemoveIndex<FromKV<TKv>>>;
};

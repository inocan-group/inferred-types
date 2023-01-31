import { KV, SimplifyObject, FromKV, RemoveIndex } from "../../types";

/**
 * **fromKv**(list)
 * 
 * Converts an array of `KV` values into a strongly typed object.
 * 
 * **Related**: `toKv`
 */
export const fromKv = <
  TKv extends readonly KV[]
>(list: TKv) => {
  return [...list].reduce(
    (acc, [_, k,v]) => {
      acc[k as any] = v;
      return acc;
    },
    {} as Record<any, any>
  ) as SimplifyObject<RemoveIndex<FromKV<TKv>>>;
};

import { GetEach } from "src/types/lists/GetEach";
import { isObject } from "../type-guards/isObject";

/**
 * **getEach**(list, prop)
 * 
 * Returns a _set_ of values for a given property in the list
 * of values.
 */
export function getEach<
  TList extends readonly any[],
  TProp extends string
>(list: TList, prop: TProp): GetEach<TList, TProp> {
  return list.map(i => isObject(i) && prop in i 
    ? i[prop]
    : undefined
  ) as GetEach<TList, TProp>;
}

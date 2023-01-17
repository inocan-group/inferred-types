import { GetEach } from "src/types/lists/GetEach";
import { get } from "../dictionary/get";
import { isSpecificConstant } from "../type-guards/isConstant";

export interface GetEachOptions<N extends boolean> {
  retainNever: N
}

/**
 * **getEach**(list, dotPath, [options])
 * 
 * Returns a specific _property_ (from an object) or _index_ (from an array) from a list
 * of items.
 * 
 * - the options allow for a "default value" to be substituted for any _undefined_ or _never_ values
 * - by default `never` values will be removed from the result set but you can override in options.
 * - the dotpath is VueJS aware of possible `Ref<T>` objects and will gracefully navigate
 * over them without the need to offset by `.value`
 */
export function getEach<
  TList extends readonly any[],
  TDotPath extends string | number | null,
  TRetainNever extends boolean = false
>(
  list: TList, 
  dotPath: TDotPath, 
  options?: GetEachOptions<TRetainNever>
): GetEach<TList, TDotPath, TRetainNever> {
  
  return list
    .map(i => dotPath === null ? i : get(i, String(dotPath))) 
    .filter(i => !isSpecificConstant("never")(i) || (options?.retainNever === true)) as GetEach<TList, TDotPath, TRetainNever>;
}

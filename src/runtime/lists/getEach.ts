import { GetEach, GetEachErrHandling } from "src/types";
import { get } from "../dictionary/get";
import { isErrorCondition } from "../type-guards/isErrorCondition";

export interface GetEachOptions<
  THandleErrors extends GetEachErrHandling
> {
  handleErrors?: THandleErrors;
}

/**
 * **getEach**(list, dotPath, [options])
 * 
 * Returns a specific _property_ (from an object) or _index_ (from an array) from a list
 * of items.
 * 
 * - the options allow for a "default value" to be substituted for any _undefined_ or _never_ values
 * - errors in looking up dotpath's will -- by default -- be removed as this is typically the desired behavior but you can also choose from:
 *    - `to-never`: converts _type_ to `never` but runtime maintains error message
 *    - `report`: both _type_ and runtime are in the `ErrorCondition` format
 * - the dotpath is VueJS aware of possible `Ref<T>` objects and will gracefully navigate
 * over them without the need to offset by `.value`
 */
export function getEach<
  TList extends readonly unknown[],
  TDotPath extends string | number | null,
  THandleErrors extends GetEachErrHandling = "ignore",
>(
  list: TList, 
  dotPath: TDotPath, 
  options?: GetEachOptions<THandleErrors>
): GetEach<TList, TDotPath, THandleErrors> {
  options = {
    handleErrors: "ignore" as THandleErrors,
    ...options,
  };
  
  return list
    .map(i => dotPath === null ? i : get(i, String(dotPath))) 
    .filter(i => !isErrorCondition(i) || (options?.handleErrors !== "ignore")) as GetEach<
      TList,
      TDotPath, 
      THandleErrors
    >;
}

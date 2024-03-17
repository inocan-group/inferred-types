
import type { Container, GetEach } from "src/types/index";

import { Never } from "src/constants/index";
import { isContainer, isErrorCondition, isNull } from "../type-guards/index";
import { get } from "../dictionary/get";

export interface GetEachOptions<
  THandleErrors
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
  TDotPath extends string | null,
  THandleErrors = "ignore",
>(
  list: TList, 
  dotPath: TDotPath, 
  options?: GetEachOptions<THandleErrors>
): GetEach<TList, TDotPath> {
  options = {
    handleErrors: "ignore" as THandleErrors,
    ...options,
  };
  
  return list
    .map(i => isNull(dotPath)
        ? i
        : isContainer(i)
          ? get(i as Container, dotPath as TDotPath & string )
          : Never
      ) 
    .filter(i => !isErrorCondition(i) || (options?.handleErrors !== "ignore")) as GetEach<
      TList,
      TDotPath
    >;
}

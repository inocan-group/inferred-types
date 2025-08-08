import type { GetEach, Narrowable } from "inferred-types/types";
import { get, isError } from "inferred-types/runtime";

export interface GetEachOptions<
    THandleErrors,
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
 * - errors in looking up dot path's will -- by default -- be removed as this is typically the desired behavior but you can also choose from:
 *    - `to-never`: converts _type_ to `never` but runtime maintains error message
 */
export function getEach<
    const TList extends readonly unknown[],
    const TDotPath extends string | null
>(
    list: TList,
    dotPath: TDotPath,
): GetEach<[...TList], TDotPath> {
    const result: unknown = list
        .map(i => dotPath === null
            ? i
            : typeof i === "object"
                ? get(i as Narrowable, dotPath as string)
                : Array.isArray(i)
                    ? get(i as readonly unknown[], dotPath as string)
                    : null as never,
        )
        .filter(i => !isError(i));

    return result as unknown as GetEach<
        [...TList],
        TDotPath
    >;
}

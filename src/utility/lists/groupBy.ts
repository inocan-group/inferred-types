import { Narrowable } from "~/types";
// import { UniqueForProp } from "~/types/lists/UniqueForProp";

/**
 * Groups an array of data based on the value of a property
 * in the objects within the array.
 * ```ts
 * const data = [ {}, {}, {} ];
 *
 * ```
 *
 * @ignore not implemented
 */
export function groupBy<T extends Record<string, Narrowable>, K extends keyof T & string>(
  _data: Readonly<T[]>
) {
  throw new Error("not implemented");
  return (_groupBy: K) => {
    // type _GroupedBy = UniqueForProp<typeof data, K>;
    // const _output = {} as Record<GroupedBy, Narrowable>;
  };
}

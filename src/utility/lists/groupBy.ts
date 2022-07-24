import { Narrowable } from "src/types/Narrowable";

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
export function groupBy<T extends Record<string, Narrowable>>(_data: Readonly<T[]>) {
  throw new Error("not implemented");
}

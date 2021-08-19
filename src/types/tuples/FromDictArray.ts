import { ExpandRecursively, UnionToIntersection } from "~/types";


/**
 * Typescript utility which recieves `T` as shape which resembles `DictArray<D>`
 * and if the type `D` can be inferred it is returned.
 * ```ts
 * // { foo: 1; bar: "hi" }
 * type Dict = FromDictArray<[["foo", { foo: 1 }], ["bar", { bar: "hi" }]]>;
 * ```
 */
export type FromDictArray<T extends [string, Record<string, unknown>][]> =
  ExpandRecursively<UnionToIntersection<T[number][1]>>;

import { ExpandRecursively , UnionToIntersection } from "src/types/index";

/**
 * Typescript utility which receives `T` as shape which resembles `DictArray<D>`
 * and if the type `D` can be inferred it is returned.
 * ```ts
 * // { foo: 1; bar: "hi" }
 * type Dict = FromDictArray<[["foo", { foo: 1 }], ["bar", { bar: "hi" }]]>;
 * ```
 */
export type FromDictArray<T extends [string, Record<string, unknown>][]> = ExpandRecursively<
  UnionToIntersection<T[number][1]>
>;

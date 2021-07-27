
import type { UnionToIntersection, ExpandRecursively } from "~/types";
import { SecondOfEach } from "./SecondOfEach";

/**
 * Typescript utility which recieves `T` as shape which resembles `DictArray<D>`
 * and if the type `D` can be inferred it is returned.
 * ```ts
 * // { foo: 1; bar: "hi" }
 * type Dict = FromDictArray<[["foo", { foo: 1 }], ["bar", { bar: "hi" }]]>;
 * ```
 */
export type FromDictArray<T extends Array<{
  [K in keyof T]: [string, Record<string, unknown>]
}[keyof T]>> = ExpandRecursively<UnionToIntersection<Exclude<SecondOfEach<T>, string>>>;

import { Narrowable, Get } from "src/types";

/**
 * **UnionFromProp**
 * 
 * Given an array of objects `<T>` and a property value `<P>`, this utility will
 * return a _union type_ of all the potential values of the objects which have
 * a keyof `P`.
 * 
 * If an object in the array _explicitly_ doesn't have the prop in it's definition then it
 * is ignored, if it is shaped to be an optional property then `undefined` will be included
 * in the union.
 * 
 * ```ts
 * const data = [
 *    { id: 123, color: "blue" },
 *    { id: 456, color: "red" },
 *  ] as const;
 * // 123 | 456
 * type U = UnionFromProp<typeof data, "id">;
 * ```
 */
export type UnionFromProp<
  T extends readonly Record<string, Narrowable>[],
  P extends string
> = Readonly<Get<T[number], P>>;

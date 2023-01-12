import { Get } from "../dictionary/Get";
import { Narrowable } from "../Narrowable";

/**
 * **UniqueForProp**
 * 
 * Given an array of objects, this type utility will extract a _union type_
 * which represents the possible values for a property on those objects.
 * 
 * If an object in the array doesn't have the prop in it's definition then it
 * is ignored.
 * 
 * ```ts
 * const data = [
 *    { id: 123, color: "blue" },
 *    { id: 456, color: "red" },
 *  ] as const;
 * // 123 | 456
 * type U = UniqueForProp<typeof data, "id">;
 * ```
 */
export type UniqueForProp<
  T extends readonly Record<string, Narrowable>[],
  P extends string
> = Readonly<Get<T[number], P>>;

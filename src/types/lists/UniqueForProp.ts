import { Get } from "../dictionary/Get";
import { Narrowable } from "../Narrowable";

/**
 * Create a union type based on a given property in an array of objects
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

import type { AfterFirst, First, Get } from "inferred-types/types";

/**
 * Tests whether any of the object in T are explicitly missing
 * the property P
 */
type HasMissingInstance<
  T extends readonly Record<string, unknown>[],
  P extends string,
> = [] extends T
  ? false
  : P extends keyof First<T>
    ? HasMissingInstance<
      AfterFirst<T>,
      P
    >
    : true;

/**
 * removes objects that do not have the property P
 */
type RemoveMissing<
  T extends readonly Record<string, unknown>[],
  P extends string,
  R extends readonly Record<string, unknown>[] = [],
> = [] extends T
  ? R[number]
  : RemoveMissing<
    AfterFirst<T>,
    P,
    P extends keyof First<T>
      ? [
          ...R,
          First<T>,
        ]
      : R
  >;

/**
 * **UnionFromProp**
 *
 * Given an array of objects `<T>` and a property value `<P>`, this utility will
 * return a _union type_ of all the potential values of the objects which have
 * a keyof `P`.
 *
 * If an object in the array _explicitly_ doesn't have the prop in it's definition
 * then it is ignored, if it is shaped to be an optional property then `undefined`
 *  will be included in the union.
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
  T extends readonly Record<string, unknown>[],
  P extends string,
> = HasMissingInstance<T, P> extends true
  ? Get<RemoveMissing<T, P>, P> | undefined
  : Get<T[number], P>;

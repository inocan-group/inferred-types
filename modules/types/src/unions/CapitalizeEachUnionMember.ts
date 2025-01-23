import type {
  AfterFirst,
  First,
  IsUnion,
  UnionToTuple,
} from "inferred-types/types";

type Process<
  T extends readonly unknown[],
  R extends readonly unknown[] = [],
> = [] extends T
  ? R[number]
  : Process<
    AfterFirst<T>,
    [
      ...R,
      First<T> extends string
        ? Capitalize<First<T>>
        : First<T>,
    ]
  >;

/**
 * **CapitalizeEachUnionMember**`<T>`
 *
 * Capitalizes all string-derived union members in a union.
 */
export type CapitalizeEachUnionMember<T> = IsUnion<T> extends true
  ? Process<UnionToTuple<T>>
  : T extends string
    ? Capitalize<T>
    : T;

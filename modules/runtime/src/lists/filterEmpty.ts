import type { AfterFirst, Empty, First, Narrowable, RemoveNever, UnionFilter } from "inferred-types/types";
import { isNotEmpty } from "inferred-types/runtime";

type NotEmpty<
  T extends readonly unknown[],
  R extends readonly unknown[] = [],
> = [] extends T
  ? RemoveNever<R>
  : NotEmpty<
    AfterFirst<T>,
    [
      ...R,
      First<T> extends Empty
        ? never
        : UnionFilter<First<T>, Empty>,
    ]
  >;

/**
 * Filters an array/tuple down to elements which are _not empty_ and
 * preserves as much of the type as possible.
 */
export function filterEmpty<
  T extends readonly N[],
  N extends Narrowable,
>(...val: T) {
  return val.filter(i => isNotEmpty(i)) as NotEmpty<T>;
}

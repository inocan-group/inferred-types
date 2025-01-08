import type { AfterFirst, First, IsEqual, Narrowable, RemoveNever } from "inferred-types/types";
import { isDefined } from "src/type-guards";

type NotUndefined<
  T extends readonly unknown[],
  R extends readonly unknown[] = [],
> = [] extends T
  ? RemoveNever<R>
  : NotUndefined<
    AfterFirst<T>,
    [
      ...R,
      IsEqual<First<T>, undefined> extends true
        ? never
        : Exclude<First<T>, undefined>,
    ]
  >;

/**
 * Filters an array/tuple down to elements which are _not undefined_ and
 * preserves as much of the type as possible.
 */
export function filterUndefined<
  T extends readonly N[],
  N extends Narrowable,
>(...val: T) {
  return val.filter(i => isDefined(i)) as NotUndefined<T>;
}
